@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 (
  echo [ERROR] Node.js not found. Run check-cms-env.bat
  pause
  exit /b 1
)

cd web
if not exist .env.local copy .env.local.example .env.local

if not exist node_modules (
  echo [1/2] npm install in web/ ...
  call "%NODEJS_DIR%npm.cmd" install
  if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
  )
)

echo [2/2] Next.js -> http://localhost:3000/ko
echo Start Strapi first: start-cms.bat
echo.
call "%NODEJS_DIR%npm.cmd" run dev
