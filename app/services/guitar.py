from app.repositories.guitar import (
    get_all,
    get_by_id
)


def list_guitar(db):
    return get_all(db)


def find_guitar(db, item_id):
    return get_by_id(db, item_id)
