import os
from pydantic import model_validator

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Hamnavaz"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = "sqlite:///./hamnavaz.db"

    DATABASE_URL_UNPOOLED: str | None = None

    JWT_SECRET_KEY: str = "CHANGE_THIS_SECRET_IN_PRODUCTION"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/auth/google/callback"

    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:8000,https://hamnavaz.vercel.app"

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        extra="ignore",
        case_sensitive=True,
    )

    @model_validator(mode="after")
    def validate_production_security(self):
        production = self.ENVIRONMENT.lower() == "production" or os.getenv("VERCEL_ENV") == "production"
        if production:
            key = self.JWT_SECRET_KEY
            if len(key) < 32 or key.lower().startswith(("change", "replace")):
                raise ValueError("Production requires a non-placeholder JWT_SECRET_KEY of at least 32 characters")
            if any(origin == "*" or "localhost" in origin or "127.0.0.1" in origin for origin in self.cors_origin_list):
                raise ValueError("Production CORS_ORIGINS must contain explicit production origins")
        return self

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


settings = Settings()
