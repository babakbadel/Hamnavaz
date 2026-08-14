from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.base import Base


class RealMusician(Base):
    __tablename__ = "realmusician"

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


