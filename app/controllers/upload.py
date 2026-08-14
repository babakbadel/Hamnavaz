from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

BASE = Path("uploads")
PROFILE = BASE / "profile"
AUDIO = BASE / "audio"
VIDEO = BASE / "video"


@router.post("/profile")
async def upload_profile(
    file: UploadFile = File(...),
):
    dst = PROFILE / file.filename

    with dst.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "path": str(dst),
    }


@router.post("/audio")
async def upload_audio(
    file: UploadFile = File(...),
):
    dst = AUDIO / file.filename

    with dst.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "path": str(dst),
    }


@router.post("/video")
async def upload_video(
    file: UploadFile = File(...),
):
    dst = VIDEO / file.filename

    with dst.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "path": str(dst),
    }
