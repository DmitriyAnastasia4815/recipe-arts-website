from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.database.database import Base, uniq_str_an


class Ingredient(Base):
    """Represents a ingredient in the database.

    This class maps to the 'ingredients' table and
    stores ingredient-specific information.

    """

    name: Mapped[uniq_str_an]
    calories: Mapped[float]
    proteins: Mapped[float]
    fats: Mapped[float]
    carbs: Mapped[float]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)

    # recipe_ingredients = relationship("RecipeIngredient", back_populates="ingredient")
