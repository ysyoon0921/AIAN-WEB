@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js가 설치되어 있지 않거나 PATH에 없습니다.
  echo.
  echo Next.js 실행에는 Node.js 20 이상이 필요합니다.
  echo https://nodejs.org/ 에서 LTS 설치 후 CMD를 새로 열어 주세요.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm을 찾을 수 없습니다.
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
echo ^(Strapi가 먼저 실행 중이어야 합니다: start-cms.bat^)
echo 종료: Ctrl+C
echo.
call npm run dev
