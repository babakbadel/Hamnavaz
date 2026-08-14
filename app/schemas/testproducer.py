from pydantic import BaseModel, ConfigDict


class TestProducerBase(BaseModel):
{{FIELDS}}


class TestProducerCreate(TestProducerBase):
    pass


class TestProducerResponse(TestProducerBase):
    id: int

    class Config:
        from_attributes = True
