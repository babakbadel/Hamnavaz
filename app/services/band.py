from app.repositories.band import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_band(db):
    return get_all(db)


def find_band(db, item_id):
    return get_by_id(db, item_id)


def create_band(db, data):
    return create(db, data)


def update_band(db, item_id, data):
    return update(db, item_id, data)


def delete_band(db, item_id):
    return delete(db, item_id)
