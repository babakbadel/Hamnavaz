from sqlalchemy.orm import Session

from app.domains.music.instruments.model import Instrument


def get_all(db: Session):
    return db.query(Instrument).all()


def get_by_id(db: Session, item_id):
    return (
        db.query(Instrument)
        .filter(Instrument.id == item_id)
        .first()
    )


def create(db: Session, instrument: Instrument):
    db.add(instrument)
    db.commit()
    db.refresh(instrument)
    return instrument
