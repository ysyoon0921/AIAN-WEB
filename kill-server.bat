@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

echo.
echo === Kill old Python servers on port 8080 ===
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  echo Stopping PID %%a ...
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo Done.
echo.
pause
