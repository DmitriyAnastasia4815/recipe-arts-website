from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.database.database import Base, uniq_str_an


class User(Base):
    """Represents a user in the database.

    This class maps to the 'users' table and stores user-specific information.

    """

    username: Mapped[uniq_str_an]
    email: Mapped[uniq_str_an]
    password_hash: Mapped[uniq_str_an]
    is_admin: Mapped[bool] = mapped_column(default=False)
