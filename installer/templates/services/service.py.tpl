from app.repositories.{{MODEL_NAME_LOWER}} import (
    get_all,
    get_by_id,
    create,
    update,
    delete
)


def list_{{MODEL_NAME_LOWER}}(db):
    return get_all(db)


def find_{{MODEL_NAME_LOWER}}(db, item_id):
    return get_by_id(db, item_id)


def create_{{MODEL_NAME_LOWER}}(db, data):
    return create(db, data)


def update_{{MODEL_NAME_LOWER}}(db, item_id, data):
    return update(db, item_id, data)


def delete_{{MODEL_NAME_LOWER}}(db, item_id):
    return delete(db, item_id)
