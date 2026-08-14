from app.repositories.testapi import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_testapi(db):
    return get_all(db)


def find_testapi(db, item_id):
    return get_by_id(db, item_id)


def create_testapi(db, data):
    return create(db, data)


def update_testapi(db, item_id, data):
    return update(db, item_id, data)


def delete_testapi(db, item_id):
    return delete(db, item_id)
