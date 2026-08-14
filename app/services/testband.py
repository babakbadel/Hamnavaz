from app.repositories.testband import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_testband(db):
    return get_all(db)


def find_testband(db, item_id):
    return get_by_id(db, item_id)


def create_testband(db, data):
    return create(db, data)


def update_testband(db, item_id, data):
    return update(db, item_id, data)


def delete_testband(db, item_id):
    return delete(db, item_id)
