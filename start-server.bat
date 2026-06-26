@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

echo.
echo ========================================
echo   AIAN - fix video + start server
echo ========================================
echo.
echo Project folder:
echo   %CD%
echo.

if not exist "assets" (
  echo Creating assets folder...
  mkdir "assets"
)

echo Files in assets folder:
dir /b "assets" 2>nul
echo.

if exist "assets\hero-bg.mp4" (
  echo [OK] assets\hero-bg.mp4 found
  goto :start
)

if exist "assets\hero-bg" (
  echo [FIX] Renaming hero-bg -^> hero-bg.mp4
  ren "assets\hero-bg" "hero-bg.mp4"
  goto :start
)

echo [ERROR] assets\hero-bg.mp4 NOT in THIS folder!
echo.
echo Your video must be here:
echo   %CD%\assets\hero-bg.mp4
echo.
echo Copy your mp4 file into assets, then run this again.
echo.
pause
exit /b 1

:start
echo.
echo Server starting from:
echo   %CD%
echo.
echo Open in browser:
echo   http://127.0.0.1:8080/assets/hero-bg.mp4
echo   http://127.0.0.1:8080/
echo.
echo Keep this window OPEN. Stop server: Ctrl+C
echo.
python -m http.server 8080
pause
