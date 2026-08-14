from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.database.session import SessionLocal
from app.services.chat_service import save_message

router = APIRouter(tags=["WebSocket"])


class ConnectionManager:
    def __init__(self):
        self.active = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active[user_id] = websocket

    def disconnect(self, user_id: int):
        self.active.pop(user_id, None)

    async def send_to(self, user_id: int, message: str):
        if user_id in self.active:
            await self.active[user_id].send_text(message)

    async def broadcast(self, message: str):
        for ws in self.active.values():
            await ws.send_text(message)


manager = ConnectionManager()


@router.websocket("/ws/chat/{user_id}")
async def websocket_chat(
    websocket: WebSocket,
    user_id: int,
):
    await manager.connect(user_id, websocket)

    await manager.broadcast(f"🟢 User {user_id} online")

    try:
        while True:

            data = await websocket.receive_text()

            parts = data.split("|", 1)

            if len(parts) != 2:
                await websocket.send_text(
                    "Invalid format. Use receiver_id|message"
                )
                continue

            receiver_id = int(parts[0])

            body = parts[1]

            db = SessionLocal()

            save_message(
                db=db,
                sender_id=user_id,
                receiver_id=receiver_id,
                text=body,
            )

            db.close()

            await manager.send_to(
                receiver_id,
                body,
            )

    except WebSocketDisconnect:

        manager.disconnect(user_id)

        await manager.broadcast(
            f"🔴 User {user_id} offline"
        )
