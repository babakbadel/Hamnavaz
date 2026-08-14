from fastapi import APIRouter

router = APIRouter(
    prefix="/singer",
    tags=["Singer"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Singer"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Singer detail"
    }
