@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN update check ===
echo Folder: %CD%
echo.

powershell -NoProfile -Command ^
  "$idx = Get-Content index.html -Raw -Encoding UTF8; " ^
  "$hist = if (Test-Path about\history.html) { Get-Content about\history.html -Raw -Encoding UTF8 } else { '' }; " ^
  "if ($idx -notmatch 'PRODUCTS v7') { Write-Host '[FAIL] index.html outdated (no PRODUCTS v7) — run: git pull origin main'; exit 1 }; " ^
  "if ($hist -match '비전|협력사|news\.html') { Write-Host '[FAIL] about/history.html is OLD version (비전/협력사/News menu)'; exit 2 }; " ^
  "if ($hist -notmatch 'AIAN 소개') { Write-Host '[FAIL] about/history.html missing new menu — run: force-sync.bat'; exit 3 }; " ^
  "if (Test-Path about\vision.html) { Write-Host '[FAIL] Old file about/vision.html still exists — delete or git pull'; exit 4 }; " ^
  "Write-Host '[OK] index.html + about/history.html look up to date.'; exit 0"

if errorlevel 1 goto fail
if errorlevel 2 goto fail
if errorlevel 3 goto fail
if errorlevel 4 goto fail

echo.
echo Use serve.bat then open http://127.0.0.1:8080/
echo About menu should be: AIAN 소개 / CEO / 회사 연혁 / Location
echo.
goto done

:fail
echo.
echo Fix:  git pull origin main
echo    or: force-sync.bat
echo.

:done
pause
