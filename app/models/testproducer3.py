from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.base import Base


class TestProducer3(Base):
    __tablename__ = "testproducer3"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    city = Column(
        String,
        nullable=False
    )


