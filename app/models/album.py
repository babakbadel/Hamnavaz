from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.base import Base


class Album(Base):
    __tablename__ = "album"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )


