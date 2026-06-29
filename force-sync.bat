@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === Force sync index.html from GitHub ===
echo Folder: %CD%
echo.

git fetch origin main
if errorlevel 1 (
  echo [ERROR] git fetch failed.
  pause
  exit /b 1
)

git checkout origin/main -- index.html
if errorlevel 1 (
  echo [ERROR] checkout failed.
  pause
  exit /b 1
)

powershell -NoProfile -Command ^
  "$t = Get-Content index.html -Raw -Encoding UTF8; " ^
  "if ($t -match '숫자로 증명합니다') { Write-Host '[FAIL] Still has old stats section!'; exit 1 }; " ^
  "if ($t -notmatch 'case-tabs') { Write-Host '[FAIL] Missing new showcase section!'; exit 2 }; " ^
  "Write-Host '[OK] index.html synced — new showcase section present.'; exit 0"

if errorlevel 1 (
  echo.
  echo Fix failed. Try: git stash
  echo            git pull origin main
  pause
  exit /b 1
)

echo.
echo Next steps:
echo   1. serve.bat          ^(use this instead of python -m http.server^)
echo   2. open-showcase.bat
echo.
pause
