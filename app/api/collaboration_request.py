from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.domains.collaboration.model import CollaborationRequest
from app.domains.common.notification import Notification
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.collaboration_request import CollaborationRequestCreate, CollaborationRequestResponse

router = APIRouter(prefix="/collaboration-request", tags=["Collaboration"])


def get_my_profile(db: Session, current_user: User) -> Profile:
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


def _notify(db: Session, user_id: int, title: str, text: str) -> None:
    db.add(Notification(user_id=user_id, title=title, text=text))


@router.post("/", response_model=CollaborationRequestResponse)
def create_request(data: CollaborationRequestCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    sender = get_my_profile(db, current_user)
    target = db.query(Profile).filter(Profile.id == data.profile_id).first()
    if target is None:
        raise HTTPException(status_code=404, detail="Target profile not found")
    if sender.id == target.id:
        raise HTTPException(status_code=400, detail="Cannot send collaboration request to yourself")

    existing = (
        db.query(CollaborationRequest)
        .filter(
            CollaborationRequest.from_profile_id == sender.id,
            CollaborationRequest.to_profile_id == target.id,
            CollaborationRequest.status == "pending",
        )
        .first()
    )
    if existing is not None:
        raise HTTPException(status_code=409, detail="A pending collaboration request already exists")

    request = CollaborationRequest(from_profile_id=sender.id, to_profile_id=target.id, message=data.message, status="pending")
    db.add(request)
    _notify(db, target.user_id, "درخواست همکاری جدید", f"{sender.display_name or 'یک نوازنده'} برای همکاری درخواست داده است.")
    db.commit()
    db.refresh(request)
    return request


@router.get("/inbox", response_model=list[CollaborationRequestResponse])
def inbox(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = get_my_profile(db, current_user)
    return (
        db.query(CollaborationRequest)
        .filter(CollaborationRequest.to_profile_id == profile.id)
        .order_by(CollaborationRequest.created_at.desc())
        .all()
    )


def _set_status(request_id: str, status: str, db: Session, current_user: User):
    profile = get_my_profile(db, current_user)
    request = (
        db.query(CollaborationRequest)
        .filter(CollaborationRequest.id == request_id, CollaborationRequest.to_profile_id == profile.id)
        .first()
    )
    if request is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if request.status != "pending":
        raise HTTPException(status_code=409, detail=f"Request is already {request.status}")

    request.status = status
    sender_profile = db.query(Profile).filter(Profile.id == request.from_profile_id).first()
    if sender_profile is not None:
        title = "درخواست همکاری پذیرفته شد" if status == "accepted" else "درخواست همکاری رد شد"
        text = f"درخواست همکاری شما توسط {profile.display_name or 'نوازنده'} {'پذیرفته شد' if status == 'accepted' else 'رد شد'}."
        _notify(db, sender_profile.user_id, title, text)
    db.commit()
    db.refresh(request)
    return {"id": request.id, "status": request.status}


@router.put("/{request_id}/accept")
def accept_request(request_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return _set_status(request_id, "accepted", db, current_user)


@router.put("/{request_id}/reject")
def reject_request(request_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return _set_status(request_id, "rejected", db, current_user)
