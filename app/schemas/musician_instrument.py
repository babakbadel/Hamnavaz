
from pydantic import BaseModel


class MusicianInstrumentCreate(BaseModel):
    musician_id: int
    instrument_id: int
    rating: float = 0
