from app.repositories.realmusician import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_realmusician(db):
    return get_all(db)


def find_realmusician(db, item_id):
    return get_by_id(db, item_id)


def create_realmusician(db, data):
    return create(db, data)


def update_realmusician(db, item_id, data):
    return update(db, item_id, data)


def delete_realmusician(db, item_id):
    return delete(db, item_id)
