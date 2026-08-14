from pydantic import BaseModel, ConfigDict


class FinalTestBase(BaseModel):
    name: str
    city: str



class FinalTestCreate(FinalTestBase):
    pass


class FinalTestResponse(FinalTestBase):
    id: int

    class Config:
        from_attributes = True
