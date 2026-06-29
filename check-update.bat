@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN update check ===
echo Folder: %CD%
echo.

findstr /C:"20250629-menu-v2" index.html >nul || (
  echo [FAIL] index.html outdated — run force-sync.bat
  goto fail
)

findstr /C:"aian-about-menu-v2" about\history.html >nul || (
  echo [FAIL] about/history.html old menu — run force-sync.bat
  goto fail
)

findstr /C:"vision.html" about\history.html >nul && (
  echo [FAIL] about/history.html still has vision.html link
  goto fail
)

if exist about\vision.html (
  echo [FAIL] Delete about\vision.html
  goto fail
)

echo [OK] Latest build on disk.
echo      Sidebar: AIAN 소개 / CEO / 회사 연혁 / Location
echo      Run serve.bat then diagnose.bat to verify server.
goto done

:fail
echo.
echo Fix: force-sync.bat
echo.

:done
pause
