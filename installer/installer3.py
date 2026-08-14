#!/usr/bin/env python3
# ============================================
# Hamnavaz CLI 2.0
# Project Manager
# ============================================

import glob
import json
import shutil
import sys
import datetime
from pathlib import Path

VERSION = "2.0.0"

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parent

PACKAGES = ROOT / "packages"
PATCHES = ROOT / "patches"
TEMPLATES = ROOT / "templates"

LOGS = ROOT / "logs"
BACKUPS = ROOT / "backups"

MANIFEST = ROOT / "manifest.json"
HISTORY = LOGS / "history.json"


# ============================================
# Helpers
# ============================================

def ensure(path: Path):
    """
    Create directory if it does not exist.
    """
    path.mkdir(
        parents=True,
        exist_ok=True,
    )


ensure(LOGS)
ensure(BACKUPS)


def load_json(path: Path):

    if not path.exists():
        return {}

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data):

    path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with open(path, "w", encoding="utf-8") as f:
        json.dump(
            data,
            f,
            indent=2,
            ensure_ascii=False,
        )

# ============================================
# History
# ============================================

def load_history():

    if not HISTORY.exists():
        return []

    return load_json(HISTORY)


def save_history(history):

    save_json(HISTORY, history)


# ============================================
# Manifest
# ============================================

def load_manifest():

    if not MANIFEST.exists():

        print("❌ manifest.json not found")

        return None

    return load_json(MANIFEST)


# ============================================
# Status
# ============================================

def status():

    print()

    print("======================================")
    print(" Hamnavaz CLI")
    print("======================================")

    print("Version    :", VERSION)
    print("Project    :", PROJECT.name)

    print()

    print("Manifest   :", MANIFEST.exists())

    print("Packages   :", len(list(PACKAGES.glob("*.json"))))

    print("Templates  :", len(list(TEMPLATES.glob("*"))))

    print("Patches    :", len(list(PATCHES.glob("*.json"))))

    print("Backups    :", len(list(BACKUPS.glob("*"))))

    print("History    :", len(load_history()))

    print()

    print("======================================")

    print()
# ============================================
# Install
# ============================================

def create_dir(path: Path):

    path.mkdir(
        parents=True,
        exist_ok=True,
    )

    print(f"[DIR ] {path}")


def create_file(path: Path):

    path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    if not path.exists():
        path.touch()

    print(f"[FILE] {path}")


def install():

    manifest = load_manifest()

    if manifest is None:
        return

    for directory in manifest.get("directories", []):

        create_dir(PROJECT / directory)

    for filename in manifest.get("files", []):

        create_file(PROJECT / filename)

    print()
    print("✅ Install Finished")
    print()


# ============================================
# Verify
# ============================================

def verify():

    manifest = load_manifest()

    if manifest is None:
        return False

    ok = True

    for directory in manifest.get("directories", []):

        if not (PROJECT / directory).is_dir():

            print("[MISSING DIR ]", directory)

            ok = False

    for filename in manifest.get("files", []):

        if not (PROJECT / filename).exists():

            print("[MISSING FILE]", filename)

            ok = False

    if ok:

        print("✅ Project Verify OK")

    else:

        print("❌ Project Verify Failed")

    return ok


# ============================================
# Build
# ============================================

def build():

    package_files = sorted(PACKAGES.glob("*.json"))

    print()

    print("🚀 Building Hamnavaz")

    print()

    for package in package_files:

        print("Package:", package.stem)

    print()

    verify()

    print()

    print("🎉 Build Finished")

    print()
# ============================================
# Backup
# ============================================

def backup():

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

    backup_dir = BACKUPS / timestamp

    ensure(backup_dir)

    folders = [
        "app",
        "installer",
    ]

    for folder in folders:

        src = PROJECT / folder

        if src.exists():

            shutil.copytree(
                src,
                backup_dir / folder,
                dirs_exist_ok=True,
            )

    print()
    print("✅ Backup Created")
    print("Location :", backup_dir)
    print()


# ============================================
# Restore
# ============================================

def restore(name):

    backup_dir = BACKUPS / name

    if not backup_dir.exists():

        print("❌ Backup not found")

        return

    folders = [
        "app",
        "installer",
    ]

    for folder in folders:

        src = backup_dir / folder

        dst = PROJECT / folder

        if src.exists():

            shutil.copytree(
                src,
                dst,
                dirs_exist_ok=True,
            )

    print()
    print("✅ Restore Completed")
    print()

# ============================================
# Template Engine
# ============================================

def list_templates():

    print()
    print("Available Templates")
    print("-------------------")

    templates = sorted(TEMPLATES.glob("*"))

    if not templates:

        print("No template found")
        print()
        return

    for template in templates:

        print(template.name)

    print()


def create_from_template(template_name, target_name):

    source = TEMPLATES / template_name

    if not source.exists():

        print("❌ Template not found")

        return

    destination = PROJECT / target_name

    if destination.exists():

        print("❌ Destination already exists")

        return

    shutil.copytree(source, destination)

    print()
    print("✅ Template Created")
    print(destination)
    print()
# ============================================
# Doctor
# ============================================

def doctor():

    print()
    print("Running Project Doctor")
    print("----------------------")

    problems = 0

    if not MANIFEST.exists():
        print("[ERROR] manifest.json missing")
        problems += 1

    if not PACKAGES.exists():
        print("[ERROR] packages folder missing")
        problems += 1

    if not PATCHES.exists():
        print("[ERROR] patches folder missing")
        problems += 1

    if not TEMPLATES.exists():
        print("[ERROR] templates folder missing")
        problems += 1

    if not BACKUPS.exists():
        print("[ERROR] backups folder missing")
        problems += 1

    if problems == 0:
        print("✅ Project Healthy")
    else:
        print(f"❌ {problems} problem(s) found")

    print()
# ============================================
# Main
# ============================================

def cmd_make(kind, name, fields=None):

    print()
    print("HDK Make")
    print("--------")
    print("Type:", kind)
    print("Name:", name)
    print()

    if kind == "entity":

        print("Generating Entity:", name)

        parts = [
            "model",
            "schema",
            "repository",
            "service",
            "controller",
            "api"
        ]

        for part in parts:
            cmd_make(part, name, fields)

        print()
        print("✅ Entity Completed:", name)
        print()

        return

    if kind == "model":

        template = TEMPLATES / "models" / "model.py.tpl"

        if not template.exists():
            print("Model template not found")
            return

        target_dir = PROJECT / "app" / "models"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace(
            "{{MODEL_NAME}}",
            name
        )

        content = content.replace(
            "{{table_name}}",
            name.lower()
        )

        fields_code = ""

        if fields:
            mapping = {
                "str": "String",
                "int": "Integer",
                "float": "Float",
                "bool": "Boolean"
            }

            for field in fields:
                fname, ftype = field.split(":")
                sql_type = mapping.get(ftype, "String")

                fields_code += (
                    f"    {fname} = Column(\n"
                    f"        {sql_type},\n"
                    f"        nullable=False\n"
                    f"    )\n\n"
                )

        content = content.replace(
            "{{FIELDS}}",
            fields_code
        )

        target.write_text(content)

        
    elif kind == "schema":

        template = TEMPLATES / "schemas" / "schema.py.tpl"

        if not template.exists():
            print("Schema template not found")
            return

        target_dir = PROJECT / "app" / "schemas"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace(
            "{{MODEL_NAME}}",
            name
        )

        fields_code = ""

        if fields:
            for field in fields:
                fname, ftype = field.split(":")
                fields_code += f"    {fname}: {ftype}\n"

        content = content.replace(
            "{{FIELDS}}",
            fields_code
        )

        target.write_text(content)
    elif kind == "repository":

        template = TEMPLATES / "repositories" / "repository.py.tpl"

        if not template.exists():
            print("Repository template not found")
            return

        target_dir = PROJECT / "app" / "repositories"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace("{{MODEL_NAME}}", name)
        content = content.replace("{{MODEL_NAME_LOWER}}", name.lower())

        target.write_text(content)

        

    elif kind == "service":

        template = TEMPLATES / "services" / "service.py.tpl"

        if not template.exists():
            print("Service template not found")
            return

        target_dir = PROJECT / "app" / "services"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace("{{MODEL_NAME}}", name)
        content = content.replace("{{MODEL_NAME_LOWER}}", name.lower())

        target.write_text(content)

        


    elif kind == "controller":

        template = TEMPLATES / "controllers" / "controller.py.tpl"

        if not template.exists():
            print("Controller template not found")
            return

        target_dir = PROJECT / "app" / "controllers"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace(
            "{{MODEL_NAME}}",
            name
        )

        content = content.replace(
            "{{MODEL_NAME_LOWER}}",
            name.lower()
        )

        target.write_text(content)
    elif kind == "api":

        template = TEMPLATES / "api" / "api.py.tpl"

        if not template.exists():
            print("API template not found")
            return

        target_dir = PROJECT / "app" / "api"
        target_dir.mkdir(parents=True, exist_ok=True)

        target = target_dir / f"{name.lower()}.py"

        content = template.read_text()

        content = content.replace("{{MODEL_NAME}}", name)
        content = content.replace("{{MODEL_NAME_LOWER}}", name.lower())

        target.write_text(content)

        
    elif kind == "crud":
        print("Generating CRUD:", name)

        parts = [
            "model",
            "schema",
            "repository",
            "service",
            "controller",
            "api"
        ]

        for part in parts:
            cmd_make(part, name, fields)

        print("CRUD completed:", name)
        return

if __name__ == "__main__":

    if len(sys.argv) == 2:

        command = sys.argv[1]

        if command == "status":
            status()

        elif command == "install":
            install()

        elif command == "verify":
            verify()

        elif command == "build":
            build()

        elif command == "backup":
            backup()

        elif command == "doctor":
            doctor()

        elif command == "templates":
            list_templates()

        else:
            print(f"Unknown command: {command}")


    elif len(sys.argv) == 3:

        command = sys.argv[1]

        if command == "restore":
            restore(sys.argv[2])

        elif command == "crud":
            cmd_make("crud", sys.argv[2])

        elif command == "entity":
            cmd_make("entity", sys.argv[2])

        elif command == "template":
            print("Usage:")
            print("python installer3.py template <template> <target>")

        else:
            print(f"Unknown command: {command}")

    elif len(sys.argv) >= 4:

        command = sys.argv[1]

        if command == "entity":

            name = sys.argv[2]
            fields = sys.argv[3:]

            cmd_make(
                "entity",
                name,
                fields
            )

        elif command == "crud":

            name = sys.argv[2]
            fields = sys.argv[3:]

            cmd_make(
                "crud",
                name,
                fields
            )

        else:
            print(f"Unknown command: {command}")

    elif len(sys.argv) == 4:

        if sys.argv[1] == "template":

            create_from_template(
                sys.argv[2],
                sys.argv[3]
            )

        elif sys.argv[1] == "make":

            cmd_make(sys.argv[2], sys.argv[3])

        else:
            print("Unknown command")


    else:

        print()
        print("Hamnavaz CLI 2.0")
        print("----------------")
        print("status")
        print("install")
        print("verify")
        print("build")
        print("backup")
        print("restore <backup_name>")
        print("doctor")
        print("templates")
        print("make <type> <name>")
        print()
