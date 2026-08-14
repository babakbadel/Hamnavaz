from fastapi import APIRouter

router = APIRouter(
    prefix="/producer",
    tags=["Producer"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Producer"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Producer detail"
    }
