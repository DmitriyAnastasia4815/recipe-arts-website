# backend/src/settings.py

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Настройки базы данных."""

    DB_USER: str = (
        "postgres"  # Значение по умолчанию, если переменная окружения не найдена
    )
    DB_PASSWORD: str = "postgres"
    DB_HOST: str = "localhost"  # Подключаемся к хосту, где запущен Docker
    DB_PORT: int = 5432  # Порт, проброшенный из контейнера
    DB_NAME: str = "postgres_db"

    # Дополнительные настройки, если нужны
    # API_V1_STR: str = "/api/v1"
    # SECRET_KEY: str = "your_secret_key" # Сгенерируйте надежный ключ!

    @property
    def database_url(self) -> str:
        """Формирует URL для подключения к базе данных."""
        # Формат: postgresql://user:password@host:port/database
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(
        env_file=".env",  # Указываем, что нужно загружать переменные из файла .env
        extra="ignore",  # Игнорировать лишние переменные окружения
    )


settings = Settings()  # Создаем экземпляр настроек
