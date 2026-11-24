"""
Uploading nodes to a GraphLang server project.

How the server login works:
    1. POST username + md5(password) to ?q=userLogin
       -> answer is "isLogged=1&token=abc123&..."
    2. Every following request sends username + md5(md5(password) + last_token).
    3. Every answer contains a fresh token (token:'xyz'), which is used for the next request.
"""

import hashlib
import re

import requests

from .node_scanner import Node


def md5(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()


class GraphLangServer:

    def __init__(self, server: str = "localhost"):
        self.base_url = f"http://{server}/GraphLangServerApp/"
        self.username = ""
        self.password_md5 = ""
        self.token = ""

    def login(self, username: str, password: str) -> bool:
        """Log in with plain text password. Returns True when the server accepted it."""
        self.username = username
        self.password_md5 = md5(password)

        answer = requests.post(
            self.base_url + "?q=userLogin",
            data={"username": username, "password": self.password_md5},
        )

        # answer looks like "isLogged=1&token=abc123&..."
        fields = dict(item.split("=", 1) for item in answer.text.strip().split("&") if "=" in item)
        self.token = fields.get("token", "")
        return fields.get("isLogged") == "1"

    def _auth_fields(self) -> dict:
        return {"username": self.username, "token": md5(self.password_md5 + self.token)}

    def _remember_new_token(self, answer_text: str):
        found = re.search(r"token:'([a-zA-Z0-9]+)'", answer_text)
        if not found:
            raise RuntimeError(f"Server answer has no new token, cannot continue:\n{answer_text}")
        self.token = found.group(1)

    def upload_node(self, node: Node, project_id: int, language: str) -> str:
        """Upload one node into the project. Returns the server answer text."""
        with open(node.file_path, "rb") as f:
            content = f.read()

        data = self._auth_fields()
        data.update({
            "projectId": project_id,
            "nodeName": node.class_name,
            "nodeContent": content.hex(),
            "nodeLanguage": language,
            "nodeDir": node.folder,
            "nodeClassParent": node.parent_class,
            "nodeDisplayName": node.file_name_without_extension,
            "nodeCategory": node.category,
            "nodeIsHidden": 1 if node.is_hidden else 0,   # 1/0 because it goes into SQL as int
        })

        answer = requests.post(self.base_url + "?q=uploadNodesToServer", data=data)
        self._remember_new_token(answer.text)
        return answer.text
