from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class MessageCreate(BaseModel):
    receiver_profile_id: UUID
    text: str = Field(min_length=1, max_length=5000)

    @field_validator("text")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Message text cannot be empty")
        return value


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    sender_profile_id: UUID
    receiver_profile_id: UUID
    text: str
    is_read: bool
