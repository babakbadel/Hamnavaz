from pydantic import BaseModel, ConfigDict


class TestBandBase(BaseModel):
{{FIELDS}}


class TestBandCreate(TestBandBase):
    pass


class TestBandResponse(TestBandBase):
    id: int

    class Config:
        from_attributes = True
