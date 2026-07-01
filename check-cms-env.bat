@echo off
cd /d "%~dp0"
echo === AIAN CMS environment check ===
echo.

call "%~dp0_ensure-node.bat"

if defined NODEJS_DIR (
  echo [OK] NODEJS_DIR=%NODEJS_DIR%
) else (
  echo [FAIL] NODEJS_DIR not set
)

if defined NPM_CMD (
  echo [OK] NPM_CMD=%NPM_CMD%
) else (
  echo [FAIL] NPM_CMD not set
)

echo.
if defined NODEJS_DIR if exist "%NODEJS_DIR%\node.exe" (
  echo Node:
  "%NODEJS_DIR%\node.exe" -v
) else (
  echo [FAIL] node.exe
)

if defined NPM_CMD (
  echo npm:
  call "%NPM_CMD%" -v
) else (
  echo [FAIL] npm
)

echo.
if exist cms\package.json (echo [OK] cms\) else (echo [FAIL] cms\)
if exist web\package.json (echo [OK] web\) else (echo [FAIL] web\)

echo.
if defined NPM_CMD (
  echo Ready. Run: start-cms.bat
) else (
  echo Run: fix-node-path.bat
)
echo.
pause
