from fastapi import APIRouter

router = APIRouter(
    prefix="/testmodel",
    tags=["TestModel"]
)


@router.get("/")
def get_all():
    return {
        "message": "List TestModel"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "TestModel detail"
    }
