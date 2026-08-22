"""add indexed user last-seen timestamp

Revision ID: add_user_last_seen_20260822
Revises: add_cities_profile_city_20260815
Create Date: 2026-08-22
"""

from alembic import op
import sqlalchemy as sa

revision = "add_user_last_seen_20260822"
down_revision = "add_cities_profile_city_20260815"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("last_seen_at", sa.DateTime(timezone=True), nullable=True))
    op.create_index("ix_users_last_seen_at", "users", ["last_seen_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_users_last_seen_at", table_name="users")
    op.drop_column("users", "last_seen_at")
