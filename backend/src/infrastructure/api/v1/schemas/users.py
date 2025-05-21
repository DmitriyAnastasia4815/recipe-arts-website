from pydantic import BaseModel, EmailStr, Field, field_validator


class UserBase(BaseModel):
    """Базовая схема (модель) для представления пользователя."""

    username: str = Field(..., description="Логин пользователя")
    email: EmailStr = Field(..., description="email пользователя")

    model_config = {
        "json_schema_extra": {
            "example": {"username": "ngdis13", "email": "ngdis13@mail.ru"}
        }
    }


class UserCreate(UserBase):
    """Схема (модель) для создания и добавления пользователя."""

    password: str = Field(
        ...,
        min_length=8,  # Минимальная длина пароля
        max_length=64,  # Максимальная длина пароля (пример)
        description="Пароль пользователя",
    )
    is_admin: bool = Field(
        default=False, description="Является ли пользователь администратором"
    )

    @field_validator("password")
    @classmethod  # В Pydantic v2 валидаторы полей должны быть classmethod
    def validate_password_complexity(cls, value: str) -> str:
        """Проверяет сложность пароля."""
        if not any(c.isupper() for c in value):
            raise ValueError("Пароль должен содержать хотя бы одну заглавную букву")
        if not any(c.islower() for c in value):
            raise ValueError("Пароль должен содержать хотя бы одну строчную букву")
        if not any(c.isdigit() for c in value):
            raise ValueError("Пароль должен содержать хотя бы одну цифру")

        return value

    model_config = {
        "json_schema_extra": {
            "example": {
                "username": "ngdis13",
                "email": "ngdis13@mail.ru",
                "password": "34kmffwFDe344",
            }
        }
    }


class UserInDB(UserBase):
    """Схема пользователя, хранимого в базе данных."""

    is_admin: bool

    class Config:
        """Настройки Pydantic-модели для работы с данными из базы."""

        from_attributes = True
        json_schema_extra = {
            "example": {
                "username": "ngdis13",
                "email": "ngdis13@mail.ru",
                "is_admit": "False",
            }
        }
