from fastapi import APIRouter

router = APIRouter(
    prefix="/artist",
    tags=["Artist"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Artist"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Artist detail"
    }
