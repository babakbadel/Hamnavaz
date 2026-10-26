from pydantic import BaseModel, ConfigDict


class ProducerBase(BaseModel):
    pass  # Legacy scaffold; no fields have been defined.


class ProducerCreate(ProducerBase):
    pass


class ProducerResponse(ProducerBase):
    id: int

    class Config:
        from_attributes = True
