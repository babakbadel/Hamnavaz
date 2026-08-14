from app.user.models.user_repository import UserRepository

class UserService:

    def __init__(self):
        self.repo = UserRepository()

    def register(self, user):
        self.repo.add(user)

    def users(self):
        return self.repo.all()