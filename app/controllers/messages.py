from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.domains.common.notification import Notification
from app.domains.messaging.model import Message
from app.domains.profiles.model import Profile
from app.domains.users.model import User
from app.schemas.message import MessageCreate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages"])


def get_my_profile(db: Session, current_user: User) -> Profile:
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.post("/", response_model=MessageResponse)
def send_message(data: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    sender = get_my_profile(db, current_user)
    receiver = db.query(Profile).filter(Profile.id == data.receiver_profile_id).first()
    if receiver is None:
        raise HTTPException(status_code=404, detail="Receiver profile not found")
    if sender.id == receiver.id:
        raise HTTPException(status_code=400, detail="Cannot send message to yourself")

    message = Message(sender_profile_id=sender.id, receiver_profile_id=receiver.id, text=data.text)
    db.add(message)
    db.add(Notification(
        user_id=receiver.user_id,
        title="پیام جدید",
        text=f"{sender.display_name or 'یک نوازنده'} برای شما پیام فرستاد.",
    ))
    db.commit()
    db.refresh(message)
    return message


@router.get("/", response_model=list[MessageResponse])
def my_messages(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = get_my_profile(db, current_user)
    return (
        db.query(Message)
        .filter(or_(Message.sender_profile_id == profile.id, Message.receiver_profile_id == profile.id))
        .order_by(Message.created_at.desc())
        .all()
    )
