from pydantic import BaseModel


class {{MODEL_NAME}}Base(BaseModel):
{{FIELDS}}


class {{MODEL_NAME}}Create({{MODEL_NAME}}Base):
    pass


class {{MODEL_NAME}}Response({{MODEL_NAME}}Base):
    id: int

    class Config:
        from_attributes = True
