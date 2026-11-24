"""
Command line interface. Run from the "GraphLang IDE" folder:

    python python_tools/node_manipulation_lib list
    python python_tools/node_manipulation_lib webpage
    python python_tools/node_manipulation_lib upload --project 22 --user me@mail.com

Use --help on any command to see all options.
"""

import argparse
import getpass
import os
import sys
import time

from .library_config import load_config
from .node_scanner import find_nodes
from .server_upload import GraphLangServer
from .web_page import build_web_page

PACKAGE_FOLDER = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CONFIG = os.path.join(PACKAGE_FOLDER, "configs", "default_library.json")
DEFAULT_TEMPLATE = os.path.join(PACKAGE_FOLDER, "templates", "graphlang_ide.html")
DEFAULT_OUTPUT = "GrahpLang IDE Generated 1.html"


def load_nodes(args):
    """Shared by all commands: read config, decide input folder, scan for nodes."""
    config = load_config(args.config)
    library_folder = args.input or config.library_folder

    if not os.path.isdir(library_folder):
        sys.exit(f"ERROR: node library folder not found: {os.path.abspath(library_folder)}")

    print(f"Config:         {args.config}")
    print(f"Library folder: {library_folder}")
    nodes = find_nodes(library_folder, config)
    print(f"Found {len(nodes)} nodes.")
    return config, nodes


def command_list(args):
    _, nodes = load_nodes(args)
    print()
    for node in nodes:
        hidden = " (hidden)" if node.is_hidden else ""
        tabs = ", ".join(node.tabs) or "-"
        print(f"{node.class_name:55} extends {node.parent_class:35} tab: {tabs}{hidden}")
        print(f"    {node.file_path}")


def command_webpage(args):
    config, nodes = load_nodes(args)
    print(f"Template:       {args.template}")
    build_web_page(args.template, nodes, config, args.output)
    print(f"Web page written to: {os.path.abspath(args.output)}")


def command_upload(args):
    config, nodes = load_nodes(args)

    project_id = args.project if args.project is not None else int(input("project id: "))
    username = args.user or input("username (email): ")
    password = args.password or getpass.getpass("password: ")

    server = GraphLangServer(args.server)
    print(f"Server:         {server.base_url}")
    if not server.login(username, password):
        sys.exit("ERROR: login failed, nothing uploaded.")

    start = time.time()
    for number, node in enumerate(nodes, start=1):
        print(f"[{number}/{len(nodes)}] uploading {node.class_name}  ({node.file_path})")
        answer = server.upload_node(node, abs(project_id), config.node_language)
        if args.verbose:
            print(answer)
    print(f"Done, {len(nodes)} nodes uploaded in {time.time() - start:.1f} s.")


def build_parser():
    parser = argparse.ArgumentParser(
        prog="node_manipulation_lib",
        description="Tools for GraphLang node libraries: list nodes, generate the IDE web page, upload nodes to the server.",
    )

    # options shared by all commands
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--config", default=DEFAULT_CONFIG,
                        help="library description JSON (hidden nodes, palette tabs). Default: configs/default_library.json")
    common.add_argument("--input", default=None,
                        help="folder with node .js files. Default: 'library_folder' from the config")

    commands = parser.add_subparsers(dest="command", required=True)

    cmd = commands.add_parser("list", parents=[common], help="print all nodes that were found")
    cmd.set_defaults(run=command_list)

    cmd = commands.add_parser("webpage", parents=[common], help="generate the IDE .html page")
    cmd.add_argument("--template", default=DEFAULT_TEMPLATE,
                     help="HTML template with {{...}} placeholders. Default: templates/graphlang_ide.html")
    cmd.add_argument("--output", default=DEFAULT_OUTPUT, help=f"output .html file. Default: '{DEFAULT_OUTPUT}'")
    cmd.set_defaults(run=command_webpage)

    cmd = commands.add_parser("upload", parents=[common], help="upload all nodes into a server project")
    cmd.add_argument("--project", type=int, help="project id (asked if missing)")
    cmd.add_argument("--user", help="username / email (asked if missing)")
    cmd.add_argument("--password", help="password (asked if missing)")
    cmd.add_argument("--server", default="localhost", help="server IP or hostname. Default: localhost")
    cmd.add_argument("--verbose", action="store_true", help="print full server answer for every node")
    cmd.set_defaults(run=command_upload)

    return parser


def main(argv=None):
    args = build_parser().parse_args(argv)
    args.run(args)
