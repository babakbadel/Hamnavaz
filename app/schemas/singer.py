from pydantic import BaseModel, ConfigDict


class SingerBase(BaseModel):
    name: str
    city: str
    age: int



class SingerCreate(SingerBase):
    pass


class SingerResponse(SingerBase):
    id: int

    class Config:
        from_attributes = True
