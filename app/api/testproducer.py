from fastapi import APIRouter

router = APIRouter(
    prefix="/testproducer",
    tags=["TestProducer"]
)


@router.get("/")
def get_all():
    return {
        "message": "List TestProducer"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "TestProducer detail"
    }
