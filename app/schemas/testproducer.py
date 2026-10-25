from pydantic import BaseModel, ConfigDict


class TestProducerBase(BaseModel):
    pass  # Legacy scaffold; no fields have been defined.


class TestProducerCreate(TestProducerBase):
    pass


class TestProducerResponse(TestProducerBase):
    id: int

    class Config:
        from_attributes = True
