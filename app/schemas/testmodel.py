from pydantic import BaseModel, ConfigDict


class TestModelBase(BaseModel):
    name: str



class TestModelCreate(TestModelBase):
    pass


class TestModelResponse(TestModelBase):
    id: int

    class Config:
        from_attributes = True
