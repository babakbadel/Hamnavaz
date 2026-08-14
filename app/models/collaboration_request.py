from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.base import Base


class CollaborationRequest(Base):

    __tablename__ = "collaboration_requests"

    id = Column(Integer, primary_key=True, index=True)

    from_musician_id = Column(
        Integer,
        ForeignKey("musician.id")
    )

    to_musician_id = Column(
        Integer,
        ForeignKey("musician.id")
    )

    message = Column(String)

    status = Column(
        String,
        default="pending"
    )
