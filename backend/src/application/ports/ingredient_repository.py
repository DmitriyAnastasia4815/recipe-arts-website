from abc import ABC, abstractmethod
from typing import List, Optional

from src.domain.entities.ingredient import (
    Ingredient as DomainIngredient,
)  # Зависит от доменной модели!


class IngredientRepository(ABC):
    """Интерфейс репозитория для работы с ингредиентами."""

    @abstractmethod
    async def save(self, ingredient: DomainIngredient) -> DomainIngredient:
        """Сохраняет или обновляет ингредиент. Возвращает сохраненный объект с ID."""
        pass

    @abstractmethod
    async def get_by_name(self, name) -> Optional[DomainIngredient]:
        """Возвращает ингредиент по имени или None, если не найден."""
        pass

    @abstractmethod
    async def get_all(self) -> List[DomainIngredient]:
        """Возвращает список всех ингредиентов."""
        pass
