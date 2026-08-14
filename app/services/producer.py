from app.repositories.producer import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_producer(db):
    return get_all(db)


def find_producer(db, item_id):
    return get_by_id(db, item_id)


def create_producer(db, data):
    return create(db, data)


def update_producer(db, item_id, data):
    return update(db, item_id, data)


def delete_producer(db, item_id):
    return delete(db, item_id)
