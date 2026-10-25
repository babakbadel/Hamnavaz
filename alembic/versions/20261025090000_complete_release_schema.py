"""Add messages and align the city slug index, preserving legacy auto-created tables."""
from alembic import op
import sqlalchemy as sa

revision = "release_schema_20261025"
down_revision = "add_user_last_seen_20260822"
branch_labels = None
depends_on = None


def upgrade():
    inspector = sa.inspect(op.get_bind())
    if "messages" not in inspector.get_table_names():
        op.create_table(
            "messages",
            sa.Column("id", sa.Uuid(), primary_key=True, nullable=False),
            sa.Column("sender_profile_id", sa.Uuid(), sa.ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False),
            sa.Column("receiver_profile_id", sa.Uuid(), sa.ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False),
            sa.Column("text", sa.Text(), nullable=False),
            sa.Column("is_read", sa.Boolean(), server_default="0", nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        )
    else:
        required = {"id", "sender_profile_id", "receiver_profile_id", "text", "is_read", "created_at", "updated_at"}
        if not required.issubset({column["name"] for column in inspector.get_columns("messages")}):
            raise RuntimeError("Existing messages schema needs manual reconciliation before migration")
    indexes = {index["name"] for index in sa.inspect(op.get_bind()).get_indexes("messages")}
    for column in ("sender_profile_id", "receiver_profile_id"):
        name = f"ix_messages_{column}"
        if name not in indexes:
            op.create_index(name, "messages", [column])

    slug_index = next((index for index in inspector.get_indexes("cities") if index["name"] == "ix_cities_slug"), None)
    if slug_index is not None and not slug_index["unique"]:
        op.drop_index("ix_cities_slug", table_name="cities")
    if slug_index is None or not slug_index["unique"]:
        op.create_index("ix_cities_slug", "cities", ["slug"], unique=True)


def downgrade():
    # This removes messages, including adopted legacy data. Back up before any downgrade.
    op.drop_index("ix_cities_slug", table_name="cities")
    op.create_index("ix_cities_slug", "cities", ["slug"], unique=False)
    op.drop_index("ix_messages_receiver_profile_id", table_name="messages")
    op.drop_index("ix_messages_sender_profile_id", table_name="messages")
    op.drop_table("messages")
