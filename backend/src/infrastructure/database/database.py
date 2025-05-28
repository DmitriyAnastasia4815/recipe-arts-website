from datetime import datetime
from typing import Annotated

from sqlalchemy import Integer, func
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

from config import settings

DATABASE_URL = settings.get_db_url()

# Создаем асинхронный движок для работы с базой данных
engine = create_async_engine(url=DATABASE_URL)
# Создаем фабрику сессий для взаимодействия с базой данных
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

uniq_str_an = Annotated[str, mapped_column(unique=True)]


# Базовый класс для всех моделей
class Base(AsyncAttrs, DeclarativeBase):
    """Базовый класс для всех моделей.

    Args:
        AsyncAttrs (class): Основной класс для всех моделей,
        от которого будут наследоваться все таблицы (модели таблиц).
        DeclarativeBase (class): Позволяет создавать асинхронные модели.

    """

    __abstract__ = (
        True  # Класс абстрактный, чтобы не создавать отдельную таблицу для него
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )

    @declared_attr.directive
    def __tablename__(cls) -> str:  # noqa: N805
        return cls.__name__.lower() + "s"


def connection(method):
    """Управляет жизненным циклом сессии базы данных для асинхронной функции.

    Обеспечивает управление жизненным циклом асинхронной сессии SQLAlchemy:
    создает сессию перед вызовом декорируемой функции, передает ее
    как именованный аргумент 'session', коммитит сессию при успешном
    выполнении, откатывает при возникновении исключения и закрывает сессию.

    Декорируемая функция должна быть асинхронной и принимать именованный
    аргумент 'session' типа AsyncSession.

    Args:
        method (Callable[..., Awaitable[Any]]):
            Асинхронная функция, которую нужно декорировать.
            Должна принимать аргумент 'session: AsyncSession'.

    Returns:
        Callable[..., Awaitable[Any]]: Обернутая асинхронная функция,
            которая управляет сессией.

    Raises:
        Exception: Любое исключение, возникшее в декорируемой функции,
                   будет перехвачено, сессия будет откатана, и исключение
                   будет повторно возбуждено.

    Example:
        >>> from sqlalchemy.ext.asyncio import AsyncSession
        >>> from database import async_session_maker # Ваш async_session_maker

        >>> @connection
        >>> async def get_user_by_id(user_id: int, session: AsyncSession):
        >>>     # Используйте 'session' здесь для запросов к БД
        >>>     user = await session.get(User, user_id)
        >>>     return user

        >>> # Вызов декорированной функции (сессия создается и управляется декоратором)
        >>> user = await get_user_by_id(1)

    """

    async def wrapper(*args, **kwargs):
        async with async_session_maker() as session:
            try:
                # Явно не открываем транзакции, так как они уже есть в контексте
                return await method(*args, session=session, **kwargs)
            except Exception as e:
                await session.rollback()  # Откатываем сессию при ошибке
                raise e  # Поднимаем исключение дальше
            finally:
                await session.close()  # Закрываем сессию

    return wrapper
