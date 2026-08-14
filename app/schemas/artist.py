from pydantic import BaseModel, ConfigDict


class ArtistBase(BaseModel):
{{FIELDS}}


class ArtistCreate(ArtistBase):
    pass


class ArtistResponse(ArtistBase):
    id: int

    class Config:
        from_attributes = True
