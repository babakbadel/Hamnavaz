from app.auth.services.auth_service import AuthService

auth = AuthService()

class AuthController:

    def register(self, user):
        return auth.register(user)

    def login(self, user, password):
        return auth.login(user, password)