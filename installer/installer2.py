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

        elif command == "template":
            print("Usage:")
            print("python installer2.py template <template> <target>")

        else:
            print(f"Unknown command: {command}")

    elif len(sys.argv) == 4:

        if sys.argv[1] == "template":

            create_from_template(
                sys.argv[2],
                sys.argv[3],
            )

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
        print("template <template> <target>")
        print()

