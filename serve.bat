@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN server (no browser cache) ===
echo Folder: %CD%
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo Open: http://127.0.0.1:8080/#results
echo.
python serve.py
