# node_manipulation_lib

Refactored replacement for `createWebPage.py` and `uploadNodesToServer.py`
(the originals are untouched).

Run every command from the **GraphLang IDE** folder, because node paths
(`LibraryBlocks/...`) are relative to it.

```
python python_tools/node_manipulation_lib list
python python_tools/node_manipulation_lib webpage
python python_tools/node_manipulation_lib upload --project 22 --user me@mail.com
```

Each command accepts:

| option       | meaning                                                   | default                          |
|--------------|-----------------------------------------------------------|----------------------------------|
| `--config`   | library description JSON (tabs, hidden nodes, language)   | `configs/default_library.json`   |
| `--input`    | folder with node `.js` files                              | `library_folder` from the config |

`webpage` also takes `--template` (default `templates/graphlang_ide.html`) and
`--output` (default `GrahpLang IDE Generated 1.html`).

`upload` also takes `--project`, `--user`, `--password` (asked if missing),
`--server` (IP or hostname, default `localhost`) and `--verbose`.

Examples:

```
python python_tools/node_manipulation_lib webpage --input ai_LibraryBlocks --output "ai IDE.html"
python python_tools/node_manipulation_lib upload --project 20 --server 192.142.0.128
python python_tools/node_manipulation_lib webpage --template python_tools/node_manipulation_lib/templates/my_ide.html
```

## Files

| file                          | what it does                                                      |
|-------------------------------|-------------------------------------------------------------------|
| `configs/default_library.json`| library folder, hidden path patterns, folder → palette tab list   |
| `templates/graphlang_ide.html`| IDE page with `{{...}}` placeholders                              |
| `library_config.py`           | reads the JSON config                                             |
| `node_scanner.py`             | finds node classes, sorts parents before children, namespaces     |
| `web_page.py`                 | fills the template                                                |
| `server_upload.py`            | login + upload to the GraphLang server                            |
| `cli.py`                      | command line                                                      |

## Template placeholders

| placeholder                   | replaced with                                          |
|-------------------------------|--------------------------------------------------------|
| `{{NAMESPACE_INIT}}`          | `GraphLang = {};` ... for every namespace              |
| `{{NODE_SCRIPT_TAGS}}`        | `<script src="./LibraryBlocks/...js">` for every node  |
| `{{NODE_PALETTE}}`            | tab buttons and draggable node items                   |
| `{{USER_DEFINED_NODES_LIST}}` | `let global_allUserDefinedNodesList = [...]`           |

## Config notes

- `categories[].folder` is **relative to the library folder**, so the same
  config works for `LibraryBlocks` and `ai_LibraryBlocks`.
  A node whose folder is inside several categories is listed in each of those
  tabs; on upload the most specific (last matching) one is sent as its category.
- A node is hidden when its path contains any of `hidden_path_patterns`.
  Hidden nodes are still loaded by the page and uploaded, just not shown in the palette.
