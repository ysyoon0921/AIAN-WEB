@echo off
echo === Fix Node.js PATH ===
echo.

set "NODE_DIR="

if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles%\nodejs"
if not defined NODE_DIR if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles(x86)%\nodejs"
if not defined NODE_DIR if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_DIR=%LOCALAPPDATA%\Programs\node"

if not defined NODE_DIR (
  echo node.exe NOT found on disk.
  echo Install Node.js LTS from https://nodejs.org/ then reboot.
  pause
  exit /b 1
)

echo Found: %NODE_DIR%
set "PATH=%NODE_DIR%;%PATH%"

echo.
echo Test in this window:
"%NODE_DIR%\node.exe" -v
"%NODE_DIR%\npm.cmd" -v
echo.

echo --- permanent PATH (run in Admin CMD) ---
echo setx PATH "%NODE_DIR%;%%PATH%%"
echo.
echo After setx: close ALL CMD windows, open NEW one, run start-cms.bat
echo.
echo Or: Windows Settings - System - About - Advanced system settings
echo      Environment Variables - Path - add: %NODE_DIR%
echo.
pause
