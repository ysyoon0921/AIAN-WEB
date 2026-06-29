@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN diagnose ===
echo Folder: %CD%
echo.

echo [1] Files on disk
findstr /C:"20250629-menu-v2" about\history.html >nul && (
  echo   OK  history.html build marker
) || (
  echo   FAIL  missing build marker — run force-sync.bat
)

findstr /C:"aian-about-menu-v2" about\history.html >nul && (
  echo   OK  history.html new About menu - intro ceo history location
) || (
  echo   FAIL  old About menu - run force-sync.bat
)

findstr /C:"vision.html" about\history.html >nul && (
  echo   FAIL  history.html links to old vision.html
) || (
  echo   OK  no vision.html link
)

if exist about\vision.html echo   FAIL  delete about\vision.html
if exist about\partners.html echo   FAIL  delete about\partners.html
if exist about\news.html echo   FAIL  delete about\news.html

echo.
echo [2] Server on port 8080
netstat -ano | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
  echo   WARN  No server — run serve.bat first
  goto browser
)

echo   OK  port 8080 open

echo.
echo [3] Live server response
powershell -NoProfile -Command ^
  "try { " ^
  "$r = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/about/history.html' -UseBasicParsing; " ^
  "$c = $r.Content; " ^
  "if ($c -match '20250629-menu-v2') { '   OK  new build marker' } else { '   FAIL  old page from server' }; " ^
  "if ($c -match 'aian-about-menu-v2') { '   OK  new About menu' } else { '   FAIL  old About menu from server' }; " ^
  "if ($c -match 'vision\.html|partners\.html|news\.html') { '   FAIL  old menu links on server' } else { '   OK  no old menu links' }; " ^
  "if ($r.Headers['Cache-Control'] -match 'no-store') { '   OK  no-store header (serve.bat)' } else { '   WARN  use serve.bat not python -m http.server' } " ^
  "} catch { '   FAIL  server not reachable — run serve.bat' }"

:browser
echo.
echo [4] Browser check (InPrivate window)
echo   http://127.0.0.1:8080/about/history.html
echo   Badge: ABOUT 20250629-menu-v2
echo   Sidebar: AIAN 소개 / CEO / 회사 연혁 / Location
echo.
pause
