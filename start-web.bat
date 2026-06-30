@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 (
  echo [ERROR] Node.js 없음 — fix-node-path.bat 또는 check-cms-env.bat 참고
  pause
  exit /b 1
)

cd web
if not exist .env.local copy .env.local.example .env.local

if not exist node_modules (
  echo [1/2] web 의존성 설치 중... ^(최초 1회^)
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install 실패
    pause
    exit /b 1
  )
)

echo [2/2] Next.js 시작 — http://localhost:3000/ko
echo ^(Strapi 먼저: start-cms.bat^)
echo.
call npm run dev
