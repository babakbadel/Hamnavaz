from app.user.services.user_service import UserService

service = UserService()

class UserController:

    def list(self):
        return service.users()