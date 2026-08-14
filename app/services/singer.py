from app.repositories.singer import (
    get_all,
    get_by_id
)


def list_singer(db):
    return get_all(db)


def find_singer(db, item_id):
    return get_by_id(db, item_id)
