@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN update check ===
echo Folder: %CD%
echo.

powershell -NoProfile -Command ^
  "$t = Get-Content index.html -Raw -Encoding UTF8; " ^
  "if ($t -match '숫자로 증명합니다') { Write-Host '[FAIL] OLD stats section found in index.html'; exit 1 }; " ^
  "if ($t -notmatch 'case-tabs') { Write-Host '[FAIL] New showcase section missing'; exit 2 }; " ^
  "if ($t -notmatch '2025-06-showcase') { Write-Host '[FAIL] Version marker missing — run: git pull origin main'; exit 3 }; " ^
  "Write-Host '[OK] Latest index.html confirmed.'; exit 0"

if errorlevel 1 goto fail
if errorlevel 2 goto fail
if errorlevel 3 goto fail

echo.
echo === Use serve.bat (NOT python -m http.server) ===
echo   serve.bat
echo.
echo Then open:
echo   http://127.0.0.1:8080/#results
echo.
echo You should see WHITE background + 8 client tabs.
echo NOT dark "숫자로 증명합니다".
echo.
goto done

:fail
echo.
echo Run: force-sync.bat
echo.

:done
pause
