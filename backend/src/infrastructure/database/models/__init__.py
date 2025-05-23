# infrastructure/database/models/__init__.py

# Импортируем все ваши ORM модели здесь, чтобы Base.metadata их увидел
from .ingredient_model import Ingredient

# from .recipe_model import Recipe
# from .recipe_ingredient_model import RecipeIngredient

# Можно также импортировать Base из database.py, если она нужна здесь
# from ..database import Base

__all__ = [
    "Ingredient",
    # "Recipe",
    # "RecipeIngredient",
]
