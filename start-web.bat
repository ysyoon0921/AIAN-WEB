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

REM Is Strapi running on 1337?
set "CMS_UP=0"
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr ":1337" ^| findstr "LISTENING"') do set "CMS_UP=1"
if "%CMS_UP%"=="0" (
  echo.
  echo [WARN] Strapi is NOT running on port 1337.
  echo Open another CMD and run:  start-cms.bat
  echo Wait until you see "Strapi started" / admin URL, then refresh the browser.
  echo.
) else (
  echo [OK] Strapi detected on port 1337
  REM Port open does not mean API is ready — hit a real endpoint.
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:1337/api/home-page?locale=ko' -UseBasicParsing -TimeoutSec 8; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
  if errorlevel 1 (
    echo [WARN] Port 1337 is open but Strapi API did not respond yet.
    echo Wait for "Strapi started successfully" in the CMS window, then refresh.
    echo If this persists, run:  reset-about-intro.bat   then   start-cms.bat
    echo.
  ) else (
    echo [OK] Strapi API responding
    echo.
  )
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
