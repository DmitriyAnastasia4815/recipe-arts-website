from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession  # Тип асинхронной сессии

from src.application.ports.ingredient_repository import IngredientRepository

# Импорты из Application (Сервис, Порт, Ошибки)
from src.application.use_cases.ingredient_service import (
    DuplicateIngredientError,
    IngredientService,
)

# Импорт из Domain (для преобразования)
from src.domain.entities.ingredient import Ingredient as DomainIngredient

# Импорты из Infrastructure (Pydantic схемы, зависимости БД)
from src.infrastructure.api.v1.schemas.ingredients import (
    IngredientCreate,
    IngredientInDB,
)
from src.infrastructure.database.dependencies import (
    get_async_db,
)  # Зависимость для асинхронной сессии БД

# Импорты из Infrastructure (Реализация Репозитория)
from src.infrastructure.database.repositories.ingredient_repository_impl import (
    IngredientRepositoryImpl,
)


def get_ingredient_service(
    db_session: AsyncSession = Depends(get_async_db),  # Получаем асинхронную сессию
) -> IngredientService:
    """Функция-зависимость для предоставления сервиса ингредиентов.

    Здесь происходит "связывание" (wiring): FastAPI предоставляет сессию БД,
    мы используем ее для создания конкретной реализации репозитория,
    и эту реализацию передаем в сервис.

    Args:
        db_session (AsyncSession, optional): Defaults to Depends(get_async_db).

    Returns:
        IngredientService: Сервис ингредиента.

    """
    # Создаем конкретную реализацию репозитория, используя сессию
    repository: IngredientRepository = IngredientRepositoryImpl(db_session)
    # Создаем сервис, передавая ему реализацию репозитория (DI)
    return IngredientService(repository)


router = APIRouter(
    prefix="/v1/ingredients",
    tags=["ingredients"],
)


@router.post("/", response_model=IngredientInDB, status_code=status.HTTP_201_CREATED)
async def create_ingredient(
    ingredient: IngredientCreate,
    service: IngredientService = Depends(
        get_ingredient_service
    ),  # FastAPI внедряет сервис
):
    """Создает новый ингредиент."""
    try:
        # 1. Преобразование Pydantic -> Domain
        domain_ingredient = DomainIngredient(
            name=ingredient.name,
            calories=ingredient.calories,
            proteins=ingredient.proteins,
            fats=ingredient.fats,
            carbs=ingredient.carbs,
            user_id=ingredient.user_id,
        )
        # 2. Вызов метода сервиса (бизнес-логика)
        created_ingredient = await service.create_ingredient(domain_ingredient)
        # 3. Преобразование Domain -> Pydantic для ответа
        return IngredientInDB.model_validate(created_ingredient)
    except DuplicateIngredientError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except Exception as e:
        print(e)
        # Обработка других потенциальных ошибок
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/", response_model=List[IngredientInDB])
async def read_ingredients(
    service: IngredientService = Depends(get_ingredient_service),
):
    """Возвращает список всех ингредиентов."""
    # 1. Вызов метода сервиса
    domain_ingredients = await service.get_all_ingredients()
    # 2. Преобразование списка Domain -> список Pydantic
    return [IngredientInDB.model_validate(ing) for ing in domain_ingredients]
