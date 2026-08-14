from app.auth.services.password_service import PasswordService

class AuthService:

    def register(self, user):
        user.password_hash = PasswordService.hash(user.password_hash)
        return user

    def login(self, user, password):
        return PasswordService.verify(password, user.password_hash)