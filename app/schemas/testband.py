from pydantic import BaseModel, ConfigDict


class TestBandBase(BaseModel):
    pass  # Legacy scaffold; no fields have been defined.


class TestBandCreate(TestBandBase):
    pass


class TestBandResponse(TestBandBase):
    id: int

    class Config:
        from_attributes = True
