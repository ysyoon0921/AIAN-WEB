@echo off
echo === Stop Next.js (port 3000) ===
echo.

set "FOUND=0"
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":3000" ^| findstr "LISTENING"') do (
  echo Stopping PID %%p ...
  taskkill /PID %%p /F 2>nul
  set "FOUND=1"
)

if exist "%~dp0web\.next\dev\lock" del /f /q "%~dp0web\.next\dev\lock" 2>nul

if "%FOUND%"=="0" (
  echo No process listening on port 3000.
) else (
  echo Done. You can run start-web.bat again.
)
echo.
pause
