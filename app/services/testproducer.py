from app.repositories.testproducer import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_testproducer(db):
    return get_all(db)


def find_testproducer(db, item_id):
    return get_by_id(db, item_id)


def create_testproducer(db, data):
    return create(db, data)


def update_testproducer(db, item_id, data):
    return update(db, item_id, data)


def delete_testproducer(db, item_id):
    return delete(db, item_id)
