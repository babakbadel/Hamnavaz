from pydantic import BaseModel, ConfigDict


class MusicianBase(BaseModel):
    name: str
    city: str
    instrument: str


class MusicianCreate(MusicianBase):
    pass


class MusicianResponse(MusicianBase):
    id: int
    user_id: int

    model_config = ConfigDict(
        from_attributes=True
    )
