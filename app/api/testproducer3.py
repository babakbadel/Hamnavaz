from fastapi import APIRouter

router = APIRouter(
    prefix="/testproducer3",
    tags=["TestProducer3"]
)


@router.get("/")
def get_all():
    return {
        "message": "List TestProducer3"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "TestProducer3 detail"
    }
