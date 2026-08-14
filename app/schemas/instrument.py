from uuid import UUID

from pydantic import BaseModel, ConfigDict


class InstrumentBase(BaseModel):
    name: str
    family: str | None = None
    description: str | None = None


class InstrumentCreate(InstrumentBase):
    pass


class InstrumentResponse(InstrumentBase):
    id: UUID

    model_config = ConfigDict(
        from_attributes=True
    )
