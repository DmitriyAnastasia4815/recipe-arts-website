from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession  # Используем асинхронную сессию

from src.application.ports.ingredient_repository import (
    IngredientRepository,
)  # Зависит от интерфейса Application слоя
from src.domain.entities.ingredient import (
    Ingredient as DomainIngredient,
)  # Зависит от доменной модели
from src.infrastructure.database.models.ingredient_model import (
    Ingredient as DBIngredient,
)  # Зависит от ORM модели Infrastructure слоя


class IngredientRepositoryImpl(IngredientRepository):
    """Реализация репозитория ингредиентов с использованием async SQLAlchemy."""

    def __init__(self, db_session: AsyncSession):
        """Инициализация.

        Args:
            db_session (AsyncSession): Асинхронная сессия.

        """
        self.db_session = db_session

    # Вспомогательные методы для преобразования между Domain и ORM моделями
    # Эти преобразования происходят на границе Infrastructure и Application/Domain
    async def _to_domain(self, db_ingredient: DBIngredient) -> DomainIngredient:
        return DomainIngredient(
            id=db_ingredient.id,
            name=db_ingredient.name,
            calories=db_ingredient.calories,
            proteins=db_ingredient.proteins,
            fats=db_ingredient.fats,
            carbs=db_ingredient.carbs,
            user_id=db_ingredient.user_id,
        )

    async def _to_db(self, domain_ingredient: DomainIngredient) -> DBIngredient:
        # Если у доменной модели есть ID, пытаемся
        # найти существующую ORM модель для обновления
        if domain_ingredient.id is not None:
            # В асинхронном коде используем execute с select
            result = await self.db_session.execute(
                select(DBIngredient).filter(DBIngredient.id == domain_ingredient.id)
            )
            db_ingredient = result.scalar_one_or_none()
            if db_ingredient:
                # Обновляем поля существующей ORM модели
                db_ingredient.name = domain_ingredient.name
                db_ingredient.calories = domain_ingredient.calories
                db_ingredient.proteins = domain_ingredient.proteins
                db_ingredient.fats = domain_ingredient.fats
                db_ingredient.carbs = domain_ingredient.carbs
                db_ingredient.user_id = domain_ingredient.user_id
                return db_ingredient

        # Если ID нет или объект не найден, создаем новую ORM модель
        return DBIngredient(
            name=domain_ingredient.name,
            calories=domain_ingredient.calories,
            proteins=domain_ingredient.proteins,
            fats=domain_ingredient.fats,
            carbs=domain_ingredient.carbs,
            user_id=domain_ingredient.user_id,
        )

    async def save(self, ingredient: DomainIngredient) -> DomainIngredient:
        """Метод для сохранения ингредиента в БД.

        Args:
            ingredient (DomainIngredient): Обьект ингредиента.

        Returns:
            DomainIngredient: Обьект ингредиента (с id).

        """
        db_ingredient = await self._to_db(ingredient)
        self.db_session.add(db_ingredient)
        await self.db_session.commit()
        await self.db_session.refresh(
            db_ingredient
        )  # Обновляем объект для получения ID, если был None
        return await self._to_domain(db_ingredient)

    async def get_all(self) -> List[DomainIngredient]:
        """Метод для получения списка обьектов ингредиентов.

        Returns:
            List[DomainIngredient]: Список обьектов ингредиентов.

        """
        result = await self.db_session.execute(select(DBIngredient))
        db_ingredients = result.scalars().all()
        return [await self._to_domain(ing) for ing in db_ingredients]

    async def get_by_name(self, name: str) -> Optional[DomainIngredient]:
        """Метод для получения обьекта ингредиента по его названию.

        Args:
            name (str): название ингредиента.

        Returns:
            Optional[DomainIngredient]: возвращает обьект  ингредиента.

        """
        result = await self.db_session.execute(
            select(DBIngredient).filter(DBIngredient.name == name)
        )
        db_ingredient = result.scalar_one_or_none()
        if db_ingredient is None:
            return None
        return await self._to_domain(db_ingredient)
