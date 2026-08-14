from pathlib import Path
import re

root = Path("app/schemas")

for file in root.glob("*.py"):
    text = file.read_text()

    if "class Config:" not in text:
        continue

    if "ConfigDict" not in text:
        text = text.replace(
            "from pydantic import BaseModel",
            "from pydantic import BaseModel, ConfigDict"
        )

    pattern = r"class Config:\s*\n\s*orm_mode\s*=\s*True"

    text = re.sub(
        pattern,
        "model_config = ConfigDict(from_attributes=True)",
        text
    )

    file.write_text(text)
    print(f"Updated: {file}")

print("Migration completed")
