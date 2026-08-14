from app.repositories.finaltest import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_finaltest(db):
    return get_all(db)


def find_finaltest(db, item_id):
    return get_by_id(db, item_id)


def create_finaltest(db, data):
    return create(db, data)


def update_finaltest(db, item_id, data):
    return update(db, item_id, data)


def delete_finaltest(db, item_id):
    return delete(db, item_id)
