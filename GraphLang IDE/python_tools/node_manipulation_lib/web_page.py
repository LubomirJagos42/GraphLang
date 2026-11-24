"""
Generating the GraphLang IDE web page from an HTML template.

The template is a normal .html file with these placeholders:

    {{NAMESPACE_INIT}}            ->  "GraphLang = {};", "GraphLang.Math = {};", ...
    {{NODE_SCRIPT_TAGS}}          ->  <script src="./LibraryBlocks/...js"></script> for every node
    {{NODE_PALETTE}}              ->  tab buttons + draggable node items in the left menu
    {{USER_DEFINED_NODES_LIST}}   ->  JS array with all classes extending GraphLang.UserDefinedNode

See templates/graphlang_ide.html for the default template.
"""

import os

from .library_config import LibraryConfig
from .node_scanner import Node, namespace_list


def namespace_init_js(nodes: list[Node]) -> str:
    return "".join(f"\t{name} = {{}};\n" for name in namespace_list(nodes))


def script_tags_html(nodes: list[Node], page_folder: str) -> str:
    """One <script> tag per node. Paths are relative to the folder of the generated page."""
    lines = []
    for node in nodes:
        src = os.path.relpath(node.file_path, page_folder).replace("\\", "/")
        lines.append(f'\t<script src="./{src}"></script>\n')
    return "".join(lines)


def palette_html(nodes: list[Node], config: LibraryConfig) -> str:
    """
    Left side menu: first a row of tab buttons, then one <span> per tab
    containing the draggable node items. Hidden nodes are not listed.
    """
    html = '\t\t<input type="button" class="always_visible" value="all" onclick="navigationShowCategory(\'all\', this)" />\n'

    # tab buttons
    for index, category in enumerate(config.categories):
        html += f'\t\t<input type="button" value="{category.tab}" onclick="navigationShowCategory(\'category_{index}\', this)" />\n'
        html += f'\t\t<span class="node_category_buttons category_{index}">\n'
        html += '\t\t\t<input type="button" value=".." onclick="navigationShowCategory(\'parent\', this)" />\n'
        html += '\t\t</span>\n'

    html += '\n\n\n'

    # node items inside each tab
    for index, category in enumerate(config.categories):
        html += f'\t\t<span class="nodes_tab category_{index}">\n'
        for node in nodes:
            if not node.is_hidden and category.tab in node.tabs:
                html += (
                    f'\t\t\t<div data-shape="{node.class_name}" data-label="{node.short_name}" '
                    f'class="palette_node_element draw2d_droppable">{node.short_name}</div>\n'
                )
        html += '\t\t</span>\n'

    return html


def user_defined_nodes_js(nodes: list[Node]) -> str:
    """JS array the IDE uses to build the context menu for pointers."""
    names = [f"'{node.class_name}'\n" for node in nodes if node.parent_class == "GraphLang.UserDefinedNode"]
    return "let global_allUserDefinedNodesList = [\n" + ",".join(names) + "];\n"


def build_web_page(template_path: str, nodes: list[Node], config: LibraryConfig, output_path: str) -> str:
    """Fill the template with the node data, write it to `output_path` and return the HTML."""
    with open(template_path, "r", encoding="utf-8") as f:
        html = f.read()

    page_folder = os.path.dirname(os.path.abspath(output_path))

    replacements = {
        "{{NAMESPACE_INIT}}": namespace_init_js(nodes),
        "{{NODE_SCRIPT_TAGS}}": script_tags_html(nodes, page_folder),
        "{{NODE_PALETTE}}": palette_html(nodes, config),
        "{{USER_DEFINED_NODES_LIST}}": user_defined_nodes_js(nodes),
    }
    for placeholder, value in replacements.items():
        if placeholder not in html:
            print(f"WARNING: placeholder {placeholder} not found in template {template_path}")
        html = html.replace(placeholder, value)

    with open(output_path, "w", encoding="utf-8", newline="") as f:
        f.write(html)

    return html
