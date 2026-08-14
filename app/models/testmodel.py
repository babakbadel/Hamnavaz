from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.base import Base


class TestModel(Base):
    __tablename__ = "testmodel"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )


