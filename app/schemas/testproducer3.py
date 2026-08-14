from pydantic import BaseModel, ConfigDict


class TestProducer3Base(BaseModel):
    name: str
    city: str



class TestProducer3Create(TestProducer3Base):
    pass


class TestProducer3Response(TestProducer3Base):
    id: int

    class Config:
        from_attributes = True
