@echo off
echo === Node.js PATH 수동 연결 ===
echo.

set "NODE_DIR="

if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles%\nodejs"
if not defined NODE_DIR if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles(x86)%\nodejs"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_DIR=%LOCALAPPDATA%\Programs\node"

if not defined NODE_DIR (
  echo node.exe를 찾지 못했습니다.
  echo Node.js LTS를 https://nodejs.org/ 에서 설치한 뒤 PC를 재부팅하세요.
  pause
  exit /b 1
)

echo 발견: %NODE_DIR%
echo.

REM 현재 세션 PATH에 추가
set "PATH=%NODE_DIR%;%PATH%"

echo 이 CMD 창에서 테스트:
node -v
npm -v
echo.

echo --- 영구 PATH 등록 (관리자 CMD 권장) ---
echo 아래 명령을 **관리자 권한 CMD**에 붙여넣기:
echo.
echo setx PATH "%NODE_DIR%;%%PATH%%"
echo.
echo setx 후 **모든 CMD 창을 닫고** 새로 연 다음 start-cms.bat 실행
echo.
echo 또는: Windows 설정 ^> 시스템 ^> 정보 ^> 고급 시스템 설정
echo       ^> 환경 변수 ^> Path ^> %NODE_DIR% 추가
echo.
pause
