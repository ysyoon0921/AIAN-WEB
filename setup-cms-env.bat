@echo off
cd /d "%~dp0"

call "%~dp0_ensure-node.bat"
if errorlevel 1 (
  echo [ERROR] Node.js not found. Run fix-node-path.bat first.
  pause
  exit /b 1
)

if not exist "cms\package.json" (
  echo [ERROR] cms\ folder not found. Run from AIAN-WEB repo root.
  pause
  exit /b 1
)

echo === AIAN CMS env setup ===
echo.

"%NODEJS_DIR%\node.exe" "cms\scripts\init-env.js"
if errorlevel 1 (
  echo [ERROR] Failed to create cms\.env
  pause
  exit /b 1
)

if not exist "web\.env.local" (
  echo STRAPI_URL=http://127.0.0.1:1337> "web\.env.local"
  echo [OK] Created web\.env.local
) else (
  echo [OK] web\.env.local already exists
)

echo.
echo Done. Run: start-cms.bat
echo.
pause
