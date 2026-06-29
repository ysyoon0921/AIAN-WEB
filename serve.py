#!/usr/bin/env python3
"""Static file server with no-cache headers (fixes stale index.html in browser)."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os

ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    port = 8080
    host = "127.0.0.1"
    server = ThreadingHTTPServer((host, port), NoCacheHandler)
    print(f"Serving {ROOT}")
    print(f"Open: http://{host}:{port}/#results")
    print("Cache disabled — always fresh files. Stop: Ctrl+C")
    server.serve_forever()
