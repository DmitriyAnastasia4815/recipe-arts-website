from fastapi import FastAPI

from infrastructure.api.routes.ingredients import router as ingredients_router

app = FastAPI()
app.include_router(ingredients_router)
print(1)
