from dataclasses import dataclass


@dataclass
class Ingredient:
    """Represents a food ingredient entity in the domain layer.

    Attributes:
        id: The unique identifier of the ingredient (None before saving).
        name: The name of the ingredient (e.g., "Куриная грудка").
        calories: The amount of calories per 100 grams.
        proteins: The amount of proteins per 100 grams.
        fats: The amount of fats per 100 grams.
        carbs: The amount of carbohydrates per 100 grams.
        user_id: The ID of the user who added this ingredient,
        or None if it's a system ingredient.

    """

    id: int | None  # id может быть None до сохранения в бд
    name: str
    proteins: float  # Б (на 100г)
    fats: float  # Ж (на 100г)
    carbs: float  # У (на 100г)
    calories: float  # К (на 100г)
    user_id: int
