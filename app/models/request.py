from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class BandRequest(Base):
    __tablename__ = "band_requests"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    sender_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    receiver_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="pending",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )
