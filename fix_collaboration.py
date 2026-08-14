from pathlib import Path

# Fix schema
schema = Path("app/schemas/collaboration_request.py")

schema.write_text("""from pydantic import BaseModel, ConfigDict


class CollaborationRequestCreate(BaseModel):
    musician_id: int
    message: str


class CollaborationRequestResponse(BaseModel):
    id: int
    from_musician_id: int
    to_musician_id: int
    message: str
    status: str

    model_config = ConfigDict(
        from_attributes=True
    )
""")

# Fix API
api = Path("app/api/collaboration_request.py")

text = api.read_text()

text = text.replace(
    "Musicician.id == data.to_musician_id",
    "Musician.id == data.musician_id"
)

text = text.replace(
    "Musician.id == data.to_musician_id",
    "Musician.id == data.musician_id"
)

text = text.replace(
    "to_musician_id=data.to_musician_id",
    "to_musician_id=data.musician_id"
)

api.write_text(text)

print("Collaboration request files fixed")
