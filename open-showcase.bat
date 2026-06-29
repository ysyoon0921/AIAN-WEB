@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo Opening showcase section...
echo Start server first: serve.bat  (NOT python -m http.server)
echo.

start "" "http://127.0.0.1:8080/#results"
