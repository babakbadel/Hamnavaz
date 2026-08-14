"""add unique rating per profile

Revision ID: add_rating_unique_20260809
Revises: 8d16de6558a2
Create Date: 2026-08-09
"""

from alembic import op


revision = "add_rating_unique_20260809"
down_revision = "8d16de6558a2"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("ratings") as batch_op:
        batch_op.create_unique_constraint(
            "uq_rating_user_profile",
            ["user_id", "profile_id"],
        )


def downgrade():
    with op.batch_alter_table("ratings") as batch_op:
        batch_op.drop_constraint(
            "uq_rating_user_profile",
            type_="unique",
        )
