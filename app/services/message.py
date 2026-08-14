from app.repositories.message import (
    get_all,
    get_by_id
)


def list_message(db):
    return get_all(db)


def find_message(db, item_id):
    return get_by_id(db, item_id)
