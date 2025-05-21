from pydantic import BaseModel, Field


class IngredientBase(BaseModel):
    """Базовая схема (модель) для представления ингредиента или продукта.

    Наследуется от pydantic.BaseModel для автоматической валидации данных.

    Атрибуты:
        name (str): Название ингредиента/продукта. Обязательное поле.
        proteins (float): Количество белков на 100 грамм продукта. Обязательное поле.
        fats (float): Количество жиров на 100 грамм продукта. Обязательное поле.
        carbs (float): Количество углеводов на 100 грамм продукта. Обязательное поле.

    """

    name: str = Field(..., description="Название ингридиента/продукта")
    calories: float = Field(..., description="Калории на 100г")
    proteins: float = Field(..., description="белки на 100 грамм")
    fats: float = Field(..., description="жиры на 100 грамм")
    carbs: float = Field(..., description="углеводы на 100 грамм")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Белый рис",
                "proteins": 4.3,
                "fats": 0.5,
                "carbs": 72,
                "calories": 103,
            }
        }
    }


class IngredientCreate(IngredientBase):
    """Схема для добавления ингредиента в базу данных."""

    user_id: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "user_id": 1,
                "name": "Белый рис",
                "proteins": 4.3,
                "fats": 0.5,
                "carbs": 72,
                "calories": 103,
            }
        }
    }


class IngredientInDB(IngredientBase):
    """Схема ингредиента, хранимого в базе данных."""

    id: int = Field(..., description="ID ингредиента")

    class Config:
        """Это важно для преобразования ORM модели в Pydantic."""

        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Помидор",
                "calories": 18.0,
                "proteins": 0.9,
                "fats": 0.2,
                "carbs": 3.9,
            }
        }
