#!/usr/bin/env python3

import glob
import json
import shutil
import sys

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

def ensure(path: Path):
    path.mkdir(
        parents=True,
        exist_ok=True,
    )


ensure(LOGS)

ensure(BACKUPS)

ensure(TEMPLATES)

def load_json(path: Path):

    if not path.exists():

        return {}

    with open(
        path,
        "r",
        encoding="utf-8",
    ) as f:

        return json.load(f)

def save_json(
    path: Path,
    data,
):

    path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with open(
        path,
        "w",
        encoding="utf-8",
    ) as f:

        json.dump(
            data,
            f,
            indent=2,
            ensure_ascii=False,
        )
def status():

    print()

    print("========== Hamnavaz ==========")

    print("Installer :", VERSION)

    print("Project   :", PROJECT)

    print("Packages  :", len(list(PACKAGES.glob("*.json"))))

    print("Templates :", len(list(TEMPLATES.glob("*"))))

    print("Patches   :", len(list(PATCHES.glob("*.json"))))

    print("==============================")

    print()


