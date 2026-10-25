from pydantic import BaseModel, ConfigDict


class ArtistBase(BaseModel):
    pass  # Legacy scaffold; no fields have been defined.


class ArtistCreate(ArtistBase):
    pass


class ArtistResponse(ArtistBase):
    id: int

    class Config:
        from_attributes = True
