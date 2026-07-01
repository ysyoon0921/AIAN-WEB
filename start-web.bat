@echo off
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 (
  echo [ERROR] Node.js not found. Run fix-node-path.bat first.
  pause
  exit /b 1
)

REM Already running on port 3000?
set "WEB_PID="
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":3000" ^| findstr "LISTENING"') do set "WEB_PID=%%p"

if defined WEB_PID (
  echo.
  echo Next.js is ALREADY running on port 3000 ^(PID %WEB_PID%^).
  echo Open:  http://localhost:3000/ko
  echo.
  echo To restart:  stop-web.bat   then   start-web.bat
  echo Or kill:     taskkill /PID %WEB_PID% /F
  echo.
  pause
  exit /b 0
)

if exist "web\.next\dev\lock" (
  echo [WARN] Stale Next.js lock file found. Removing...
  del /f /q "web\.next\dev\lock" 2>nul
)

cd web
if not exist .env.local copy .env.local.example .env.local

if not exist node_modules (
  echo [1/2] npm install in web/ ...
  call "%NPM_CMD%" install
  if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
  )
)

echo [2/2] Next.js at http://localhost:3000/ko
echo Start Strapi first: start-cms.bat
echo Stop later: stop-web.bat
echo.
call "%NPM_CMD%" run dev
