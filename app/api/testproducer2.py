from fastapi import APIRouter

router = APIRouter(
    prefix="/testproducer2",
    tags=["TestProducer2"]
)


@router.get("/")
def get_all():
    return {
        "message": "List TestProducer2"
    }


@router.get("/{item_id}")
def get_one(item_id: int):
    return {
        "id": item_id,
        "message": "TestProducer2 detail"
    }
