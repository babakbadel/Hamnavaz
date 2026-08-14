from pydantic import BaseModel, ConfigDict


class RealMusicianBase(BaseModel):
    name: str
    city: str



class RealMusicianCreate(RealMusicianBase):
    pass


class RealMusicianResponse(RealMusicianBase):
    id: int

    class Config:
        from_attributes = True
