from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    """Represents a user in the domain."""

    username: str
    email: str
    password_hash: str
    is_admin: bool = False
    id: Optional[int] = None  # None, пока не сохранено в БД
