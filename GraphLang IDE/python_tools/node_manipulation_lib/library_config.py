"""
Loading of the library description file (JSON).

The library description says:
    - which folder contains the node .js files
    - which nodes are hidden (not shown in the palette, but still loaded)
    - which palette tab each sub-folder belongs to
    - which language the nodes are written for (sent to the server on upload)

See configs/default_library.json for an example.
"""

import json
from dataclasses import dataclass, field


@dataclass
class Category:
    """One palette tab. Every node whose folder starts with `folder` goes into this tab."""
    folder: str     # relative to the library folder, always with forward slashes
    tab: str        # text shown on the tab button


@dataclass
class LibraryConfig:
    library_folder: str = "LibraryBlocks"
    node_language: str = "C/C++"
    hidden_path_patterns: list[str] = field(default_factory=list)
    categories: list[Category] = field(default_factory=list)


def load_config(config_path: str) -> LibraryConfig:
    """Read the JSON library description and return it as a LibraryConfig."""
    with open(config_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories = [
        Category(folder=item["folder"].replace("\\", "/").strip("/"), tab=item["tab"])
        for item in data.get("categories", [])
    ]

    return LibraryConfig(
        library_folder=data.get("library_folder", "LibraryBlocks"),
        node_language=data.get("node_language", "C/C++"),
        hidden_path_patterns=data.get("hidden_path_patterns", []),
        categories=categories,
    )
