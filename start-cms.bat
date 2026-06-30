@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js가 설치되어 있지 않거나 PATH에 없습니다.
  echo.
  echo CMS ^(Strapi^) 실행에는 Node.js 20 이상이 필요합니다.
  echo.
  echo 1. https://nodejs.org/ 접속
  echo 2. LTS ^(20.x 또는 22.x^) 다운로드 후 설치
  echo 3. 설치 시 "Add to PATH" 옵션 체크
  echo 4. CMD 창을 닫고 새로 연 뒤 다시 실행:
  echo    start-cms.bat
  echo.
  echo 설치 확인:  node -v   npm -v
  echo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm을 찾을 수 없습니다. Node.js를 재설치해 주세요.
  pause
  exit /b 1
)

echo Node: 
node -v
echo npm: 
npm -v
echo.

cd cms
if not exist node_modules (
  echo [1/2] cms 의존성 설치 중... ^(최초 1회, 수 분 소요^)
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install 실패
    pause
    exit /b 1
  )
)

echo [2/2] Strapi CMS 시작 — http://localhost:1337/admin
echo 종료: Ctrl+C
echo.
call npm run develop
