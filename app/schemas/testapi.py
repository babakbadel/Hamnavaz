from pydantic import BaseModel, ConfigDict


class TestAPIBase(BaseModel):
    name: str
    city: str



class TestAPICreate(TestAPIBase):
    pass


class TestAPIResponse(TestAPIBase):
    id: int

    class Config:
        from_attributes = True
