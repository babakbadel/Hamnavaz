from pydantic import BaseModel, ConfigDict


class GuitarBase(BaseModel):
    pass


class GuitarCreate(GuitarBase):
    pass


class GuitarResponse(GuitarBase):

    id: int

    class Config:
        from_attributes = True
