from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class NotificationCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    text: str = Field(min_length=1, max_length=500)

    @field_validator("title", "text")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Notification text cannot be empty")
        return value


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    text: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
