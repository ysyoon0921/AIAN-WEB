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
  "if ($idx -notmatch '20250629-menu-v2') { Write-Host '[FAIL] index.html outdated — run: force-sync.bat'; exit 1 }; " ^
  "if ($hist -notmatch '20250629-menu-v2') { Write-Host '[FAIL] about pages outdated — run: force-sync.bat'; exit 2 }; " ^
  "if ($hist -match '비전|협력사|news\.html') { Write-Host '[FAIL] OLD about menu still in history.html'; exit 3 }; " ^
  "if (Test-Path about\vision.html) { Write-Host '[FAIL] Delete about\vision.html (old file)'; exit 4 }; " ^
  "Write-Host '[OK] Files on disk are latest build.'; exit 0"

if errorlevel 1 goto fail
if errorlevel 2 goto fail
if errorlevel 3 goto fail
if errorlevel 4 goto fail

echo.
echo Browser check:
echo   1. Close ALL tabs for localhost / 127.0.0.1
echo   2. serve.bat
echo   3. Open NEW tab: http://127.0.0.1:8080/about/history.html
echo   4. Bottom-right must show: ABOUT 20250629-menu-v2
echo   5. Sidebar must show: AIAN 소개 / CEO / 회사 연혁 / Location
echo.
goto done

:fail
echo.
echo Fix: force-sync.bat
echo.

:done
pause
