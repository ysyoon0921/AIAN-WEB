@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js를 찾을 수 없습니다.
  echo.
  echo 설치했는데도 안 되면 아래를 순서대로 확인하세요:
  echo.
  echo  1. **이 CMD 창을 완전히 닫고** 새 CMD를 연다
  echo     ^(설치 직후 예전 창에서는 PATH가 안 바뀜^)
  echo.
  echo  2. PC **재부팅** ^(그래도 안 되면^)
  echo.
  echo  3. 아래 파일이 있는지 탐색기에서 확인:
  echo     C:\Program Files\nodejs\node.exe
  echo.
  echo  4. node.exe가 있는데 CMD에서만 안 되면:
  echo     fix-node-path.bat 실행
  echo.
  echo  5. 진단:  check-cms-env.bat
  echo.
  echo 재설치: https://nodejs.org/  ^> LTS ^> "Add to PATH" 체크
  echo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] node는 있으나 npm이 없습니다. Node.js를 재설치해 주세요.
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
