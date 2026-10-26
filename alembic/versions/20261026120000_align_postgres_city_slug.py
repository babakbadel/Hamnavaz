"""Remove PostgreSQL's redundant city slug constraint, retaining its unique index."""
from alembic import op
import sqlalchemy as sa

revision = "pg_city_slug_20261026"
down_revision = "release_schema_20261025"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    if bind.dialect.name != "postgresql":
        return
    inspector = sa.inspect(bind)
    # The prior revision creates the model's unique index on every database.
    # Never remove the original constraint before checking its replacement.
    if not any(index["name"] == "ix_cities_slug" and index["unique"]
               for index in inspector.get_indexes("cities")):
        raise RuntimeError("Unique city slug index must exist before constraint alignment")
    for constraint in inspector.get_unique_constraints("cities"):
        if constraint["column_names"] == ["slug"]:
            op.drop_constraint(constraint["name"], "cities", type_="unique")


def downgrade():
    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        constraints = sa.inspect(bind).get_unique_constraints("cities")
        if not any(item["column_names"] == ["slug"] for item in constraints):
            op.create_unique_constraint("cities_slug_key", "cities", ["slug"])
