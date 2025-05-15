from fastapi import APIRouter

router = APIRouter(prefix="/ingredients")


@router.get("/")
async def get_ingredients():
    """Получает список всех доступных ингредиентов.

    Возвращает список словарей, представляющих ингредиенты с их
    пищевой ценностью на 100 грамм.
    В текущей реализации возвращает фиксированный пример.
    """
    return [{"name": "Белый рис", "proteins": 4.3, "fats": 0.5, "carbs": 72}]
