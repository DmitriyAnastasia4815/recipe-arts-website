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
    proteins: float = Field(..., description="белки на 100 грамм")
    fats: float = Field(..., description="жиры на 100 грамм")
    carbs: float = Field(..., description="углеводы на 100 грамм")

    model_config = {
        "json_schema_extra": {
            "example": {"name": "Белый рис", "proteins": 4.3, "fats": 0.5, "carbs": 72}
        }
    }
