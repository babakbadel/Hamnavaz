from app.models.testproducer import TestProducer


def get_all(db):
    return db.query(TestProducer).all()


def get_by_id(db, item_id):
    return db.query(TestProducer).filter(
        TestProducer.id == item_id
    ).first()


def create(db, data):
    obj = TestProducer(**data.model_dump())
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
