from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession  # Тип асинхронной сессии

from src.application.ports.password_hasher import PasswordHasher
from src.application.ports.user_repository import UserRepository

# Импорты из Application (Сервис, Порт, Ошибки)
from src.application.use_cases.user_service import (
    DuplicateUserError,
    UserService,
)

# Импорт из Domain (для преобразования)
from src.domain.entities.user import User as DomainUser

# Импорты из Infrastructure (Pydantic схемы, зависимости БД)
from src.infrastructure.api.v1.schemas.users import (
    UserCreate,
    UserInDB,
)
from src.infrastructure.database.dependencies import (
    get_async_db,
)  # Зависимость для асинхронной сессии БД

# Импорты из Infrastructure (Реализация Репозитория)
from src.infrastructure.database.repositories.user_repository_impl import (
    UserRepositoryImpl,
)
from src.infrastructure.secure import PasswordHasherImpl


# Функция-зависимость для предоставления сервиса ингредиентов
# Здесь происходит "связывание" (wiring): FastAPI предоставляет сессию БД,
# мы используем ее для создания конкретной реализации репозитория,
# и эту реализацию передаем в сервис.
def get_user_service(
    db_session: AsyncSession = Depends(get_async_db),  # Получаем асинхронную сессию
) -> UserService:
    """Создаем конкретную реализацию репозитория, используя сессию и хешера паролей.

    Args:
        db_session (AsyncSession, optional): Defaults to Depends(get_async_db).

    Returns:
        UserService: Сервис пользователя.

    """
    # Создаем конкретную реализацию репозитория, используя сессию
    repository: UserRepository = UserRepositoryImpl(db_session)
    password_hasher: PasswordHasher = PasswordHasherImpl()

    # Создаем сервис, передавая ему реализацию репозитория (DI)
    return UserService(repository, password_hasher)


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def create_ingredient(
    user: UserCreate,
    service: UserService = Depends(get_user_service),  # FastAPI внедряет сервис
):
    """Создает нового пользователя."""
    try:
        # 1. Преобразование Pydantic -> Domain
        domain_user = DomainUser(
            username=user.username,
            password_hash=user.password,  # хеширование пароля в бизнес логике
            is_admin=user.is_admin,
            email=user.email,
        )
        # 2. Вызов метода сервиса (бизнес-логика)
        created_user = await service.create_user(domain_user)
        # 3. Преобразование Domain -> Pydantic для ответа
        return UserInDB.model_validate(created_user)
    except DuplicateUserError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except Exception as e:
        print(e)
        # Обработка других потенциальных ошибок
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
