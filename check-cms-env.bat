@echo off
cd /d "%~dp0"
echo === AIAN CMS environment check ===
echo.

call "%~dp0_ensure-node.bat"
set "FOUND=0"

where node >nul 2>&1
if not errorlevel 1 (
  set "FOUND=1"
  for /f "delims=" %%v in ('node -v 2^>nul') do echo [OK] node %%v
) else (
  echo [FAIL] node not in PATH
)

where npm >nul 2>&1
if not errorlevel 1 (
  for /f "delims=" %%v in ('npm -v 2^>nul') do echo [OK] npm  %%v
) else (
  echo [FAIL] npm not in PATH
)

echo.
echo --- install paths ---
if exist "%ProgramFiles%\nodejs\node.exe" (
  echo [FOUND] %ProgramFiles%\nodejs\node.exe
  set "FOUND=1"
) else (
  echo [MISS]  %ProgramFiles%\nodejs\node.exe
)

if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
  echo [FOUND] %LOCALAPPDATA%\Programs\node\node.exe
  set "FOUND=1"
)

if defined NODEJS_DIR echo [SESSION PATH] NODEJS_DIR=%NODEJS_DIR%

echo.
if exist cms\package.json (echo [OK] cms\) else (echo [FAIL] cms\ - wrong git branch?)
if exist web\package.json (echo [OK] web\) else (echo [FAIL] web\)

echo.
if "%FOUND%"=="0" (
  echo Node.js is NOT installed or not found.
  echo Install LTS: https://nodejs.org/
  echo Then reboot and run this again.
) else (
  echo OK - run start-cms.bat
)
echo.
pause
