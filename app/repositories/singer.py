from app.models.singer import Singer


def get_all(db):
    return db.query(Singer).all()


def get_by_id(db, item_id):
    return db.query(Singer).filter(
        Singer.id == item_id
    ).first()
