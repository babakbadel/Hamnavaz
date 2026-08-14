from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database import Base


class {{MODEL_NAME}}(Base):
    __tablename__ = "{{table_name}}"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

{{FIELDS}}
