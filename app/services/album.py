from app.repositories.album import (
    get_all,
    get_by_id
)


def list_album(db):
    return get_all(db)


def find_album(db, item_id):
    return get_by_id(db, item_id)
