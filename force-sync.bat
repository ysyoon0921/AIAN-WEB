@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === Force sync from GitHub (main) ===
echo Folder: %CD%
echo.

git fetch origin main
if errorlevel 1 (
  echo [ERROR] git fetch failed.
  pause
  exit /b 1
)

git checkout origin/main -- index.html about assets/subpage.css assets/products-scroll.css assets/products-scroll.js assets/nav.css scripts/generate-subpages.py
if errorlevel 1 (
  echo [ERROR] checkout failed.
  pause
  exit /b 1
)

if exist about\vision.html del /f about\vision.html
if exist about\partners.html del /f about\partners.html
if exist about\news.html del /f about\news.html

powershell -NoProfile -Command ^
  "$idx = Get-Content index.html -Raw -Encoding UTF8; " ^
  "$hist = Get-Content about\history.html -Raw -Encoding UTF8; " ^
  "if ($idx -notmatch 'PRODUCTS v7') { Write-Host '[FAIL] index.html products section outdated'; exit 1 }; " ^
  "if ($hist -match '비전|협력사|news\.html|vision\.html|partners\.html') { Write-Host '[FAIL] about/history.html still OLD menu (CEO/비전/협력사/News)'; exit 2 }; " ^
  "if ($hist -notmatch 'AIAN 소개') { Write-Host '[FAIL] about/history.html missing AIAN 소개 menu'; exit 3 }; " ^
  "Write-Host '[OK] index.html + about/ synced.'; exit 0"

if errorlevel 1 (
  echo.
  echo Try full sync: git stash
  echo               git pull origin main
  pause
  exit /b 1
)

echo.
echo Next: serve.bat  then  Ctrl+F5 refresh
echo.
pause
