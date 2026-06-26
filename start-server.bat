@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
echo.
echo === AIAN video check ===
echo Project folder: %CD%
echo.

if exist "assets\hero-bg.mp4" (
  echo [OK] assets\hero-bg.mp4 exists
  for %%A in ("assets\hero-bg.mp4") do echo      Size: %%~zA bytes
) else if exist "assets\hero-bg" (
  echo [WARN] Found assets\hero-bg without .mp4 extension
  echo        Renaming to hero-bg.mp4 ...
  ren "assets\hero-bg" "hero-bg.mp4"
) else (
  echo [ERROR] assets\hero-bg.mp4 NOT found
  echo         Put your mp4 file in: %CD%\assets\
  goto :end
)

echo.
echo Starting server... Test these URLs in browser:
echo   http://127.0.0.1:8080/
echo   http://127.0.0.1:8080/assets/hero-bg.mp4
echo.
echo If the second URL plays/downloads the video, the file is OK.
echo Press Ctrl+C to stop the server.
echo.
python -m http.server 8080

:end
pause
