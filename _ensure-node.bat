@echo off
REM 현재 CMD 세션에서 node/npm PATH 보정 (설치 직후 PATH 미반영 대응)
where node >nul 2>&1 && exit /b 0

if exist "%ProgramFiles%\nodejs\node.exe" (
  set "PATH=%ProgramFiles%\nodejs;%PATH%"
  where node >nul 2>&1 && exit /b 0
)

if exist "%ProgramFiles(x86)%\nodejs\node.exe" (
  set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"
  where node >nul 2>&1 && exit /b 0
)

if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
  set "PATH=%LOCALAPPDATA%\Programs\node;%PATH%"
  where node >nul 2>&1 && exit /b 0
)

REM nvm-windows (현재 사용 중인 버전 symlink)
if exist "%ProgramFiles%\nodejs\node.exe" (
  set "PATH=%ProgramFiles%\nodejs;%PATH%"
  where node >nul 2>&1 && exit /b 0
)

exit /b 1
