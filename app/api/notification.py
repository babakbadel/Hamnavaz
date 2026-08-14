from fastapi import APIRouter

router = APIRouter(
    prefix="/notification",
    tags=["Notification"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Notification"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Notification detail"
    }
