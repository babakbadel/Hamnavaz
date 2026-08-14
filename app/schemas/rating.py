from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RatingCreate(BaseModel):
    profile_id: UUID
    score: int = Field(ge=1, le=5)


class RatingResponse(BaseModel):
    id: UUID
    profile_id: UUID
    user_id: int
    score: int

    model_config = ConfigDict(from_attributes=True)
