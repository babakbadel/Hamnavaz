from pydantic import BaseModel, ConfigDict


class AlbumBase(BaseModel):
    name: str



class AlbumCreate(AlbumBase):
    pass


class AlbumResponse(AlbumBase):
    id: int

    class Config:
        from_attributes = True
