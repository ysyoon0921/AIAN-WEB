@echo off
echo === AIAN CMS 환경 진단 ===
echo.

call "%~dp0_ensure-node.bat"

where node >nul 2>&1
if errorlevel 1 (
  echo [FAIL] node — PATH에서 찾을 수 없음
) else (
  for /f "delims=" %%v in ('node -v 2^>nul') do echo [OK]   node  %%v
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [FAIL] npm
) else (
  for /f "delims=" %%v in ('npm -v 2^>nul') do echo [OK]   npm   %%v
)

echo.
echo --- 설치 경로 확인 ---
if exist "%ProgramFiles%\nodejs\node.exe" (
  echo [FOUND] %ProgramFiles%\nodejs\node.exe
) else (
  echo [----]  %ProgramFiles%\nodejs\node.exe  ^(없음^)
)

if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
  echo [FOUND] %LOCALAPPDATA%\Programs\node\node.exe
)

echo.
if exist cms\package.json (echo [OK] cms\) else (echo [FAIL] cms\ — 브랜치 확인)
if exist web\package.json (echo [OK] web\) else (echo [FAIL] web\)

echo.
if errorlevel 0 where node >nul 2>&1 && goto :ok
echo node.exe 파일은 있는데 PATH만 안 잡힌 경우: fix-node-path.bat
echo node.exe 자체가 없으면: https://nodejs.org LTS 재설치
echo.
:ok
pause
