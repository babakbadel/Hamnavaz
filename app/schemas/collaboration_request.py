from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CollaborationRequestCreate(BaseModel):
    profile_id: UUID
    message: str | None = None


class CollaborationRequestResponse(BaseModel):
    id: UUID
    from_profile_id: UUID
    to_profile_id: UUID
    message: str | None = None
    status: str

    model_config = ConfigDict(from_attributes=True)
