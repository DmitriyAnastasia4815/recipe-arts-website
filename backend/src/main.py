from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.infrastructure.api.v1.routes.ingredients import router as ingredients_router
from src.infrastructure.api.v1.routes.users import router as users_router

app = FastAPI()
app.include_router(ingredients_router)
app.include_router(users_router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
