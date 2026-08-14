from fastapi import APIRouter

router = APIRouter(
    prefix="/testband",
    tags=["TestBand"]
)


@router.get("/")
def get_all():
    return {
        "message": "List TestBand"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "TestBand detail"
    }
