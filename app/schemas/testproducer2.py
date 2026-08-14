from pydantic import BaseModel, ConfigDict


class TestProducer2Base(BaseModel):
{{FIELDS}}


class TestProducer2Create(TestProducer2Base):
    pass


class TestProducer2Response(TestProducer2Base):
    id: int

    class Config:
        from_attributes = True
