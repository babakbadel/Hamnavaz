from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Guitar(Base):
    __tablename__ = "guitar"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )
