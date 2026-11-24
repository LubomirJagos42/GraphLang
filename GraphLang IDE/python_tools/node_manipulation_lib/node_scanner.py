"""
Finding GraphLang nodes on disk.

A "node" is a .js file that defines a class like this:

    GraphLang.Math.Add = GraphLang.UserDefinedNode.extend({ ... });

From every such file we remember the class name, the class it extends,
which palette tab it belongs to and whether it is hidden.
"""

import glob
import os
import re
from dataclasses import dataclass

from .library_config import LibraryConfig


# Matches "Some.Class.Name = Parent.Class.extend"
CLASS_DEFINITION_REGEX = re.compile(
    r"[\/\s\n]*([a-zA-Z0-9\.\-\_]+)[\s]*=[\s]*([a-zA-Z0-9\.\-]+)\.extend",
    re.MULTILINE,
)


@dataclass
class Node:
    file_path: str          # path to the .js file, forward slashes, e.g. "LibraryBlocks/GraphLang/Math/Basic/Add.js"
    class_name: str         # e.g. "GraphLang.Math.Add"
    parent_class: str       # e.g. "GraphLang.UserDefinedNode"
    folder_in_library: str  # folder relative to the library root, e.g. "GraphLang/Math/Basic"
    tabs: list[str]         # every palette tab this node is listed in (usually one)
    is_hidden: bool         # hidden nodes are loaded by the IDE but not shown in the palette

    @property
    def folder(self) -> str:
        """Folder of the .js file, e.g. "LibraryBlocks/GraphLang/Math/Basic"."""
        return os.path.dirname(self.file_path)

    @property
    def short_name(self) -> str:
        """Last part of the class name, used as label in the palette, e.g. "Add"."""
        return self.class_name.split(".")[-1]

    @property
    def file_name_without_extension(self) -> str:
        return os.path.splitext(os.path.basename(self.file_path))[0]

    @property
    def category(self) -> str | None:
        """The main tab of the node (the most specific matching one), or None."""
        return self.tabs[-1] if self.tabs else None


def _to_forward_slashes(path: str) -> str:
    return path.replace("\\", "/")


def _folder_is_inside(folder: str, parent: str) -> bool:
    """True when `folder` equals `parent` or is somewhere below it."""
    return folder == parent or folder.startswith(parent + "/")


def find_nodes(library_folder: str, config: LibraryConfig) -> list[Node]:
    """
    Search `library_folder` (recursively) for node .js files.

    The returned list is ordered so that a parent class always comes before
    the classes that extend it. This matters because the browser must load
    the parent <script> first.
    """
    library_folder = _to_forward_slashes(library_folder).rstrip("/")
    nodes = []

    for file_path in glob.glob(library_folder + "/**", recursive=True):
        if not file_path.endswith(".js") or os.path.isdir(file_path):
            continue
        file_path = _to_forward_slashes(file_path)

        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            match = CLASS_DEFINITION_REGEX.search(f.read())
        if not match:
            continue

        folder_in_library = _to_forward_slashes(
            os.path.relpath(os.path.dirname(file_path), library_folder)
        )
        if folder_in_library == ".":
            folder_in_library = ""

        tabs = [
            category.tab
            for category in config.categories
            if _folder_is_inside(folder_in_library, category.folder)
        ]

        is_hidden = any(pattern in file_path for pattern in config.hidden_path_patterns)

        nodes.append(Node(
            file_path=file_path,
            class_name=match.group(1),
            parent_class=match.group(2),
            folder_in_library=folder_in_library,
            tabs=tabs,
            is_hidden=is_hidden,
        ))

    return sort_parents_first(nodes)


def sort_parents_first(nodes: list[Node]) -> list[Node]:
    """
    Reorder nodes so each parent class is before its children.

    Simple approach: walk through the list; whenever a node is found that is
    the parent of some node placed before it, swap the two and start again.
    """
    nodes = list(nodes)
    i = 0
    while i < len(nodes):
        swapped = False
        for j in range(i):
            if nodes[j].parent_class == nodes[i].class_name:
                nodes[i], nodes[j] = nodes[j], nodes[i]
                swapped = True
                break
        i = 0 if swapped else i + 1
    return nodes


def namespace_list(nodes: list[Node]) -> list[str]:
    """
    List every JavaScript namespace the node classes live in, parents first.

    Example: for class "GraphLang.Math.Add" the namespaces are
    "GraphLang" and "GraphLang.Math". The IDE needs them declared as empty
    objects ("GraphLang.Math = {};") before the node scripts are loaded.
    "draw2d" is skipped because draw2d.js defines it itself.
    """
    # Build a tree of nested dicts: {"GraphLang": {"Math": {}}}
    tree = {}
    for node in nodes:
        parts = node.class_name.split(".")
        if len(parts) > 1:
            parts = parts[:-1]          # drop the class itself, keep only namespaces
        branch = tree
        for part in parts:
            if part == "draw2d":
                continue
            branch = branch.setdefault(part, {})

    # Walk the tree. Children are collected before their parent and the whole
    # list is reversed at the end, so parents end up first.
    result = []

    def walk(branch: dict, prefix: str):
        for name, children in branch.items():
            full_name = f"{prefix}.{name}" if prefix else name
            walk(children, full_name)
            result.append(full_name)

    walk(tree, "")
    return result[::-1]
