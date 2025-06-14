from abc import ABC, abstractmethod
from typing import List, Optional

from src.domain.entities.user import (
    User as DomainUser,
)  # Зависит от доменной модели!


class UserRepository(ABC):
    """Интерфейс репозитория для работы с пользователями."""

    @abstractmethod
    async def save(self, ingredient: DomainUser) -> DomainUser:
        """Сохраняет или обновляет пользователя. Возвращает сохраненный объект с ID."""
        pass

    @abstractmethod
    async def get_by_email(self, email) -> Optional[DomainUser]:
        """Возвращает пользователя по email или None, если не найден."""
        pass

    @abstractmethod
    async def get_all(self) -> List[DomainUser]:
        """Возвращает список всех пользователей."""
        pass
