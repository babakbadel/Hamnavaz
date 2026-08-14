from fastapi import APIRouter

router = APIRouter(
    prefix="/band",
    tags=["Band"]
)


@router.get("/")
def get_all():
    return {
        "message": "List Band"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "Band detail"
    }
