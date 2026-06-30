@echo off
REM Find node.exe and set NODEJS_DIR for this CMD session (no trailing slash)
set "NODEJS_DIR="

where node >nul 2>&1
if not errorlevel 1 (
  for /f "delims=" %%i in ('where node 2^>nul') do (
    set "NODEJS_DIR=%%~dpi"
    goto :strip
  )
)

if exist "%ProgramFiles%\nodejs\node.exe" set "NODEJS_DIR=%ProgramFiles%\nodejs" & goto :apply
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODEJS_DIR=%ProgramFiles(x86)%\nodejs" & goto :apply
if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODEJS_DIR=%LOCALAPPDATA%\Programs\node" & goto :apply
if exist "%LOCALAPPDATA%\nodejs\node.exe" set "NODEJS_DIR=%LOCALAPPDATA%\nodejs" & goto :apply

exit /b 1

:strip
if not defined NODEJS_DIR exit /b 1
if "%NODEJS_DIR:~-1%"=="\" set "NODEJS_DIR=%NODEJS_DIR:~0,-1%"

:apply
if not defined NODEJS_DIR exit /b 1
set "PATH=%NODEJS_DIR%;%PATH%"
exit /b 0
