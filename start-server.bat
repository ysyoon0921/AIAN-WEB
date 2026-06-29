@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

echo.
echo ========================================
echo   AIAN - start server (NO CACHE)
echo ========================================
echo.
echo Project folder:
echo   %CD%
echo.
echo NOTE: Do NOT use "python -m http.server" — it causes OLD pages to stick.
echo       This script uses serve.py (same as serve.bat).
echo.

if not exist "assets\hero-bg.mp4" (
  echo [WARN] assets\hero-bg.mp4 not found — hero video may be missing.
  echo.
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo Open: http://127.0.0.1:8080/
echo Badge check: MAIN 20250629-menu-v2 / ABOUT 20250629-menu-v2
echo.
python serve.py
