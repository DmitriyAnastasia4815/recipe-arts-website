from typing import List

from src.application.ports.ingredient_repository import (
    IngredientRepository,
)  # Зависит от интерфейса!
from src.domain.entities.ingredient import Ingredient as DomainIngredient


# Определяем кастомные ошибки для Application слоя
class DuplicateIngredientError(Exception):
    """Ингредиент с таким именем уже существует."""

    pass


class IngredientService:
    """Сервис для управления ингредиентами."""

    def __init__(self, repository: IngredientRepository):
        """Инициализирует сервис ингредиентов с репозиторием.

        Args:
            repository (UserRepository): реализация репозитория.

        """
        # Сервис зависит от абстракции (интерфейса), а не от конкретной реализации
        self.repository = repository

    async def create_ingredient(self, ingredient: DomainIngredient) -> DomainIngredient:
        """Создает новый ингредиент."""
        # Бизнес-логика: Проверяем уникальность имени перед сохранением
        existing_ingredient = await self.repository.get_by_name(ingredient.name)
        if existing_ingredient:
            raise DuplicateIngredientError(
                f"Ингредиент с названием '{ingredient.name}' уже существует."
            )

        # Сохраняем через репозиторий (который реализует порт)
        return await self.repository.save(ingredient)

    async def get_all_ingredients(self) -> List[DomainIngredient]:
        """Возвращает список всех ингредиентов."""
        return await self.repository.get_all()
