@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo Opening showcase section in browser...
echo URL: http://127.0.0.1:8080/#results
echo.
echo Make sure server is running:
echo   python -m http.server 8080 --bind 127.0.0.1
echo.

start "" "http://127.0.0.1:8080/#results"
