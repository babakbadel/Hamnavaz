from __future__ import annotations

from uuid import UUID, uuid4

from sqlalchemy import (
    Boolean,
    ForeignKey,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.database.mixins import TimestampMixin


class Instrument(Base, TimestampMixin):
    __tablename__ = "instruments"

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    family: Mapped[str | None] = mapped_column(
        String(80),
        nullable=True,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    user_instruments: Mapped[list["UserInstrument"]] = relationship(
        back_populates="instrument",
        cascade="all, delete-orphan",
    )


class UserInstrument(Base, TimestampMixin):
    __tablename__ = "user_instruments"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "instrument_id",
            name="uq_user_instrument",
        ),
    )

    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    instrument_id: Mapped[UUID] = mapped_column(
        ForeignKey("instruments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    level: Mapped[str] = mapped_column(
        String(40),
        default="beginner",
        nullable=False,
    )

    years_experience: Mapped[int | None] = mapped_column(
        nullable=True,
    )

    is_primary: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        "User",
        back_populates="user_instruments",
    )

    instrument: Mapped["Instrument"] = relationship(
        "Instrument",
        back_populates="user_instruments",
    )
