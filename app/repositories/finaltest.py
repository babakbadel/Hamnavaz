from app.models.finaltest import FinalTest


def get_all(db):
    return db.query(FinalTest).all()


def get_by_id(db, item_id):
    return db.query(FinalTest).filter(
        FinalTest.id == item_id
    ).first()


def create(db, data):
    obj = FinalTest(**data.model_dump())
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
