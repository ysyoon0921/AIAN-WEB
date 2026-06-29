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
echo Open in browser:
echo   http://127.0.0.1:8080/
echo.
echo Scroll to section: "AIAN의 솔루션으로 이뤄낸 성과를 보여드립니다"
echo If still old page: press Ctrl+Shift+R in browser.
echo.

:done
pause
