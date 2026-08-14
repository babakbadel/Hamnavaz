from fastapi import APIRouter

router = APIRouter(
    prefix="/album",
    tags=["Album"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Album"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Album detail"
    }
