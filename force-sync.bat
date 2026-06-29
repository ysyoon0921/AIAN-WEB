@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === Force sync ALL files from GitHub (main) ===
echo Folder: %CD%
echo.

git fetch origin main
if errorlevel 1 (
  echo [ERROR] git fetch failed.
  pause
  exit /b 1
)

git reset --hard origin/main
if errorlevel 1 (
  echo [ERROR] reset failed.
  pause
  exit /b 1
)

if exist about\vision.html del /f about\vision.html
if exist about\partners.html del /f about\partners.html
if exist about\news.html del /f about\news.html

powershell -NoProfile -Command ^
  "$idx = Get-Content index.html -Raw -Encoding UTF8; " ^
  "$hist = Get-Content about\history.html -Raw -Encoding UTF8; " ^
  "if ($idx -notmatch '20250629-menu-v2') { Write-Host '[FAIL] index.html build marker missing'; exit 1 }; " ^
  "if ($hist -notmatch 'aian-about-menu-v2') { Write-Host '[FAIL] about/history.html old About menu'; exit 2 }; " ^
  "if ($hist -match 'vision\.html|partners\.html|news\.html') { Write-Host '[FAIL] old menu links in history.html'; exit 3 }; " ^
  "Write-Host '[OK] All files synced to origin/main.'; exit 0"

if errorlevel 1 (
  pause
  exit /b 1
)

echo.
echo IMPORTANT: Close ALL browser tabs for 127.0.0.1:8080
echo Then: serve.bat  and open NEW tab: http://127.0.0.1:8080/
echo.
echo Check bottom-right badge:
echo   Main page  = MAIN 20250629-menu-v2
echo   About page = ABOUT 20250629-menu-v2
echo.
pause
