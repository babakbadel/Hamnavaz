from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NotificationCreate(BaseModel):
    title: str
    text: str


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    text: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
