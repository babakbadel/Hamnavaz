from app.repositories.testmodel import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_testmodel(db):
    return get_all(db)


def find_testmodel(db, item_id):
    return get_by_id(db, item_id)


def create_testmodel(db, data):
    return create(db, data)


def update_testmodel(db, item_id, data):
    return update(db, item_id, data)


def delete_testmodel(db, item_id):
    return delete(db, item_id)
