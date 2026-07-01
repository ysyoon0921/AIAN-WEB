@echo off
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 goto :no_node

echo Node:
"%NODEJS_DIR%\node.exe" -v
echo npm:
call "%NPM_CMD%" -v
if errorlevel 1 goto :no_node
echo.

cd cms

if not exist ".env" (
  echo [1/3] Creating cms\.env ^(APP_KEYS^) ...
  call "%NODEJS_DIR%\node.exe" "scripts\init-env.js"
  if errorlevel 1 (
    echo [ERROR] Could not create cms\.env — run setup-cms-env.bat
    pause
    exit /b 1
  )
)

if not exist "..\web\.env.local" (
  echo STRAPI_URL=http://127.0.0.1:1337> "..\web\.env.local"
)

if not exist node_modules (
  echo [2/3] npm install in cms/ ... first run may take several minutes
  call "%NPM_CMD%" install
  if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
  )
)

echo [3/3] Strapi CMS at http://localhost:1337/admin
echo Stop with Ctrl+C
echo.
call "%NPM_CMD%" run develop
exit /b 0

:no_node
echo.
echo [ERROR] Node.js / npm not found.
echo.
echo You already ran fix-node-path.bat OK? Then run start-cms.bat again in THAT same CMD window.
echo.
echo Or:
echo   fix-node-path.bat
echo   start-cms.bat
echo.
pause
exit /b 1
