# Hamnavaz Domain Events

## Collaboration
- `collaboration.request.created` → notify target user.
- `collaboration.request.accepted` → notify requester.
- `collaboration.request.rejected` → notify requester.

## Messaging
- `message.created` → notify receiver.

## Design rule
Domain actions must update their own persistence and create the corresponding notification in the same database transaction. This keeps the current modular-monolith implementation consistent without introducing a message broker prematurely.
