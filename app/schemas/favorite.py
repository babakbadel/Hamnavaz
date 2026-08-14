from uuid import UUID

from pydantic import BaseModel, ConfigDict


class FavoriteCreate(BaseModel):
    profile_id: UUID


class FavoriteResponse(BaseModel):
    id: UUID
    user_id: int
    profile_id: UUID

    model_config = ConfigDict(from_attributes=True)
