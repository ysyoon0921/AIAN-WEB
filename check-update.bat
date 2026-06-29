@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN update check ===
echo Folder: %CD%
echo.

findstr /C:"aian-version" /C:"2025-06-showcase" index.html >nul 2>&1
if errorlevel 1 (
  echo [FAIL] index.html is OLD - missing showcase version marker.
  echo        Run: git pull origin main
  goto done
)

findstr /C:"showcase" index.html >nul 2>&1
if errorlevel 1 (
  echo [FAIL] index.html has no showcase section.
  goto done
)

findstr /C:"숫자로 증명합니다" index.html >nul 2>&1
if not errorlevel 1 (
  echo [FAIL] index.html still has old stats section.
  goto done
)

echo [OK] Latest index.html detected.
echo.
echo === Open this URL directly ===
echo   http://127.0.0.1:8080/#results
echo.
echo You should see:
echo   - Title: AIAN의 솔루션으로 이뤄낸 성과를 보여드립니다
echo   - 8 client tabs (한성전자, 대양정밀, ...)
echo   - NOT the old dark "숫자로 증명합니다" section
echo.
echo Server must be running in another window:
echo   python -m http.server 8080 --bind 127.0.0.1
echo.
echo Browser: Ctrl+Shift+R to hard refresh.
echo.

:done
pause
