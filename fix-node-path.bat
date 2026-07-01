@echo off
echo === Fix Node.js PATH ===
echo.

set "NODE_DIR="

if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles%\nodejs"
if not defined NODE_DIR if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles(x86)%\nodejs"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_DIR=%LOCALAPPDATA%\Programs\node"

if not defined NODE_DIR (
  echo node.exe NOT found. Install from https://nodejs.org/
  pause
  exit /b 1
)

echo Found: %NODE_DIR%
set "PATH=%NODE_DIR%;%PATH%"

echo.
echo Test:
"%NODE_DIR%\node.exe" -v
if exist "%NODE_DIR%\npm.cmd" (
  "%NODE_DIR%\npm.cmd" -v
) else (
  echo [WARN] npm.cmd missing - reinstall Node.js
)
echo.

echo OK in this window. Now run:
echo   start-cms.bat
echo.
echo For NEW CMD windows, add to PATH once (Admin CMD):
echo   setx PATH "%NODE_DIR%;%%PATH%%"
echo then close ALL CMD and open a new one.
echo.
pause
