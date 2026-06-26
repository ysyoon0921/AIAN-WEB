@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

echo.
echo === Quick test ===
echo Folder: %CD%
echo.

if not exist "assets\hero-bg.mp4" (
  echo FAIL: assets\hero-bg.mp4 missing
  pause
  exit /b 1
)

echo OK: file exists
echo.
echo Starting server for 3 seconds...
start /b python -m http.server 8080 --bind 127.0.0.1 --directory "%CD%"

timeout /t 2 /nobreak >nul

powershell -NoProfile -Command ^
  "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/assets/hero-bg.mp4' -Method Head -UseBasicParsing; Write-Host ('HTTP ' + $r.StatusCode + ' OK - video reachable'); exit 0 } catch { Write-Host ('FAIL: ' + $_.Exception.Message); exit 1 }"

set RESULT=%ERRORLEVEL%

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

echo.
if %RESULT%==0 (
  echo All good! Run start-server.bat and open http://127.0.0.1:8080/
) else (
  echo Still failing. Run kill-server.bat then start-server.bat again.
)
echo.
pause
