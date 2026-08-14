from app.repositories.artist import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_artist(db):
    return get_all(db)


def find_artist(db, item_id):
    return get_by_id(db, item_id)


def create_artist(db, data):
    return create(db, data)


def update_artist(db, item_id, data):
    return update(db, item_id, data)


def delete_artist(db, item_id):
    return delete(db, item_id)
