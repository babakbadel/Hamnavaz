from pydantic import BaseModel, ConfigDict


class ProducerBase(BaseModel):
{{FIELDS}}


class ProducerCreate(ProducerBase):
    pass


class ProducerResponse(ProducerBase):
    id: int

    class Config:
        from_attributes = True
