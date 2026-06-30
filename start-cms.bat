@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 goto :no_node

if not defined NODEJS_DIR (
  echo [ERROR] NODEJS_DIR not set
  goto :no_node
)

if not exist "%NODEJS_DIR%\npm.cmd" (
  echo [ERROR] npm.cmd not found in %NODEJS_DIR%
  goto :no_node
)

echo Node:
"%NODEJS_DIR%\node.exe" -v
echo npm:
"%NODEJS_DIR%\npm.cmd" -v
echo.

cd cms
if not exist node_modules (
  echo [1/2] npm install in cms/ ... first run may take several minutes
  call "%NODEJS_DIR%\npm.cmd" install
  if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
  )
)

echo [2/2] Strapi CMS -> http://localhost:1337/admin
echo Stop: Ctrl+C
echo.
call "%NODEJS_DIR%\npm.cmd" run develop
exit /b 0

:no_node
echo.
echo [ERROR] Node.js not found.
echo.
echo Try in order:
echo   1. Close ALL CMD windows. Open a NEW CMD.
echo   2. Reboot PC if you just installed Node.js.
echo   3. Check file exists: C:\Program Files\nodejs\node.exe
echo   4. Run: check-cms-env.bat
echo   5. Run: fix-node-path.bat
echo   6. Reinstall LTS from https://nodejs.org/  check "Add to PATH"
echo.
echo In NEW CMD test:  node -v   and   npm -v
echo.
pause
exit /b 1
