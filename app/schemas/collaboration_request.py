from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CollaborationRequestCreate(BaseModel):
    profile_id: UUID
    message: str | None = Field(default=None, max_length=2000)

    @field_validator("message")
    @classmethod
    def normalize_message(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip()
        return value or None


class CollaborationRequestResponse(BaseModel):
    id: UUID
    from_profile_id: UUID
    to_profile_id: UUID
    message: str | None = None
    status: str

    model_config = ConfigDict(from_attributes=True)
