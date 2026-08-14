from uuid import UUID

from pydantic import BaseModel, ConfigDict


class MessageCreate(BaseModel):
    receiver_profile_id: UUID
    text: str


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    sender_profile_id: UUID
    receiver_profile_id: UUID
    text: str
    is_read: bool
