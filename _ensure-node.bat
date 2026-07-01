@echo off
REM Sets PATH to Node.js folder. Works even when node is not in system PATH yet.
set "NODEJS_DIR="
set "NPM_CMD="

if exist "%ProgramFiles%\nodejs\node.exe" set "NODEJS_DIR=%ProgramFiles%\nodejs"
if not defined NODEJS_DIR if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODEJS_DIR=%ProgramFiles(x86)%\nodejs"
if not defined NODEJS_DIR if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODEJS_DIR=%LOCALAPPDATA%\Programs\node"

where node >nul 2>&1
if not errorlevel 1 if not defined NODEJS_DIR (
  for /f "delims=" %%i in ('where node 2^>nul') do (
    set "NODEJS_DIR=%%~dpi"
    goto :strip
  )
)

if not defined NODEJS_DIR exit /b 1

:strip
if "%NODEJS_DIR:~-1%"=="\" set "NODEJS_DIR=%NODEJS_DIR:~0,-1%"

if exist "%NODEJS_DIR%\npm.cmd" set "NPM_CMD=%NODEJS_DIR%\npm.cmd"
if not defined NPM_CMD if exist "%NODEJS_DIR%\npm" set "NPM_CMD=%NODEJS_DIR%\npm"
if not defined NPM_CMD exit /b 1

set "PATH=%NODEJS_DIR%;%PATH%"
exit /b 0
