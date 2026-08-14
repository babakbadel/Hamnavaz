class UserRepository:

    def __init__(self):
        self.users = []

    def add(self, user):
        self.users.append(user)

    def all(self):
        return self.users

    def find_by_username(self, username):
        for user in self.users:
            if user.username == username:
                return user
        return None