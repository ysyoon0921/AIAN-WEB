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

if not exist "assets" mkdir "assets"

if exist "assets\hero-bg.mp4.mp4" (
  echo [FIX] Found hero-bg.mp4.mp4 - renaming to hero-bg.mp4
  if exist "assets\hero-bg.mp4" del "assets\hero-bg.mp4"
  ren "assets\hero-bg.mp4.mp4" "hero-bg.mp4"
)

if exist "assets\hero-bg" (
  echo [FIX] Renaming hero-bg -^> hero-bg.mp4
  ren "assets\hero-bg" "hero-bg.mp4"
)

if not exist "assets\hero-bg.mp4" (
  echo [ERROR] assets\hero-bg.mp4 NOT found!
  echo Put your video here: %CD%\assets\hero-bg.mp4
  pause
  exit /b 1
)

echo [OK] assets\hero-bg.mp4 found
for %%A in ("assets\hero-bg.mp4") do echo      Size: %%~zA bytes
echo.

echo Stopping any old server on port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo.
echo Starting server (folder: %CD%)
echo.
echo Test these URLs:
echo   http://127.0.0.1:8080/assets/hero-bg.mp4
echo   http://127.0.0.1:8080/
echo.
echo Keep this window OPEN. Stop: Ctrl+C
echo.

python -m http.server 8080 --bind 127.0.0.1 --directory "%CD%"
pause
