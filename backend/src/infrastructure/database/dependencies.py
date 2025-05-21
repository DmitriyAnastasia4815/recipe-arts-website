from typing import AsyncGenerator

from src.infrastructure.database.database import async_session_maker


async def get_async_db() -> AsyncGenerator:
    """Зависимость FastAPI для получения асинхронной сессии БД.

    Yields:
        Iterator[AsyncGenerator]: Асинхронная сессия.

    """
    async with async_session_maker() as session:
        yield session
        # Сессия автоматически закроется после выхода из контекстного менеджера
