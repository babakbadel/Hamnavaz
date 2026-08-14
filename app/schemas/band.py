from pydantic import BaseModel, ConfigDict


class BandBase(BaseModel):
    name: str
    city: str
    description: str | None = None


class BandCreate(BandBase):
    pass


class BandResponse(BandBase):
    id: int
    owner_id: int | None = None

    model_config = ConfigDict(from_attributes=True)
