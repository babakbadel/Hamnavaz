from app.domains.music.instruments.model import UserInstrument as MusicianInstrument


def get_all(db):
    return db.query(MusicianInstrument).all()


def create(db, item):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
