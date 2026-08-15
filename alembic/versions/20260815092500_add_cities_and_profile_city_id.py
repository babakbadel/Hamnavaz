"""add cities and normalized profile city reference

Revision ID: add_cities_profile_city_20260815
Revises: add_rating_unique_20260809
Create Date: 2026-08-15
"""

from alembic import op
import sqlalchemy as sa


revision = "add_cities_profile_city_20260815"
down_revision = "add_rating_unique_20260809"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "cities",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=100), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("api_value", sa.String(length=100), nullable=False),
        sa.Column(
            "is_active",
            sa.Boolean(),
            server_default="1",
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
        sa.UniqueConstraint("name"),
        sa.UniqueConstraint("api_value"),
    )
    op.create_index("ix_cities_slug", "cities", ["slug"], unique=False)
    op.create_index("ix_cities_is_active", "cities", ["is_active"], unique=False)

    with op.batch_alter_table("profiles") as batch_op:
        batch_op.add_column(sa.Column("city_id", sa.Integer(), nullable=True))
        batch_op.create_index("ix_profiles_city_id", ["city_id"], unique=False)
        batch_op.create_foreign_key(
            "fk_profiles_city_id_cities",
            "cities",
            ["city_id"],
            ["id"],
            ondelete="SET NULL",
        )


def downgrade() -> None:
    with op.batch_alter_table("profiles") as batch_op:
        batch_op.drop_constraint("fk_profiles_city_id_cities", type_="foreignkey")
        batch_op.drop_index("ix_profiles_city_id")
        batch_op.drop_column("city_id")

    op.drop_index("ix_cities_is_active", table_name="cities")
    op.drop_index("ix_cities_slug", table_name="cities")
    op.drop_table("cities")
