from app.models.{{MODEL_NAME_LOWER}} import {{MODEL_NAME}}


def get_all(db):
    return db.query({{MODEL_NAME}}).all()


def get_by_id(db, item_id):
    return db.query({{MODEL_NAME}}).filter(
        {{MODEL_NAME}}.id == item_id
    ).first()


def create(db, data):
    obj = {{MODEL_NAME}}(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update(db, item_id, data):
    obj = get_by_id(db, item_id)

    if obj is None:
        return None

    for key, value in data.model_dump().items():
        setattr(obj, key, value)

    db.commit()
    db.refresh(obj)

    return obj


def delete(db, item_id):
    obj = get_by_id(db, item_id)

    if obj is None:
        return False

    db.delete(obj)
    db.commit()

    return True
