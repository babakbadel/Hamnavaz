from app.repositories.instrument import (
    get_all,
    get_by_id,
    create,
)

from app.domains.music.instruments.model import Instrument


def list_instrument(db):
    return get_all(db)


def find_instrument(db, item_id):
    return get_by_id(db, item_id)


def create_instrument(db, data):
    instrument = Instrument(
        name=data.name,
        family=getattr(data, "family", None),
        description=getattr(data, "description", None),
    )

    return create(db, instrument)
