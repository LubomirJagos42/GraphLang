# Allows both:
#   python python_tools/node_manipulation_lib <command> ...      (run the folder)
#   python -m node_manipulation_lib <command> ...                 (from inside python_tools)
import os
import sys

if __package__ in (None, ""):
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from node_manipulation_lib.cli import main

main()
