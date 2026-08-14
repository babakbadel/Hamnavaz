from app.models.guitar import Guitar


def get_all(db):
    return db.query(Guitar).all()


def get_by_id(db, item_id):
    return db.query(Guitar).filter(
        Guitar.id == item_id
    ).first()
