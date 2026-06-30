@echo off
echo === AIAN CMS 환경 확인 ===
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [FAIL] node  — 미설치 또는 PATH 없음
  echo        ^> https://nodejs.org/ LTS 설치 필요
) else (
  for /f "delims=" %%v in ('node -v') do echo [OK]   node  %%v
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [FAIL] npm   — 미설치
) else (
  for /f "delims=" %%v in ('npm -v') do echo [OK]   npm   %%v
)

echo.
if exist cms\package.json (
  if exist cms\node_modules (echo [OK]   cms\node_modules) else (echo [--]   cms\node_modules ^(start-cms.bat 실행 시 자동 설치^))
) else (
  echo [FAIL] cms 폴더 없음 — git checkout cursor/strapi-nextjs-poc-bf00
)

if exist web\package.json (
  if exist web\node_modules (echo [OK]   web\node_modules) else (echo [--]   web\node_modules ^(start-web.bat 실행 시 자동 설치^))
) else (
  echo [FAIL] web 폴더 없음
)

echo.
echo Node.js 설치 후 CMD를 **새로** 열고 start-cms.bat 실행
echo.
pause
