from typing import List

from src.application.ports.password_hasher import PasswordHasher
from src.application.ports.user_repository import (
    UserRepository,
)  # Зависит от интерфейса!
from src.domain.entities.user import User as DomainUser


# Определяем кастомные ошибки для Application слоя
class DuplicateUserError(Exception):
    """Пользователь с таким email уже существует."""

    pass


class UserService:
    """Сервис для управления пользователями."""

    def __init__(self, repository: UserRepository, password_hasher: PasswordHasher):
        """Инициализирует сервис пользователей с репозиторием и хешером паролей.

        Args:
            repository (UserRepository): реализация репозитория.
            password_hasher (PasswordHasher): реализация хешера.

        """
        # Сервис зависит от абстракции (интерфейса), а не от конкретной реализации
        self.repository = repository
        self.password_hasher = password_hasher

    async def create_user(self, user: DomainUser) -> DomainUser:
        """Создает нового пользователя."""
        # Бизнес-логика: Проверяем уникальность email перед сохранением
        existing_user = await self.repository.get_by_email(user.email)
        if existing_user:
            raise DuplicateUserError(
                f"Пользователь с таким email '{user.email}' уже существует."
            )
        # Хешируем пароль
        user.password_hash = await self.password_hasher.get_password_hash(
            user.password_hash
        )
        # Сохраняем через репозиторий (который реализует порт)
        return await self.repository.save(user)

    async def get_all_users(self) -> List[DomainUser]:
        """Возвращает список всех пользователей."""
        return await self.repository.get_all()
