from fastapi import APIRouter

router = APIRouter(
    prefix="/guitar",
    tags=["Guitar"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Guitar"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Guitar detail"
    }
