import hashlib

class PasswordService:

    @staticmethod
    def hash(password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def verify(password: str, password_hash: str) -> bool:
        return PasswordService.hash(password) == password_hash