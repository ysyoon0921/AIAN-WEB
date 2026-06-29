@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === AIAN diagnose ===
echo Folder: %CD%
echo.

echo [1] Files on disk
findstr /C:"20250629-menu-v2" about\history.html >nul && (
  echo   OK  history.html has build marker 20250629-menu-v2
) || (
  echo   FAIL  history.html missing build marker — run force-sync.bat
)

findstr /C:"AIAN 소개" about\history.html >nul && (
  echo   OK  history.html has AIAN 소개 menu
) || (
  echo   FAIL  history.html missing AIAN 소개
)

findstr /C:"비전" about\history.html >nul && (
  echo   FAIL  history.html still has OLD menu (비전)
) || (
  echo   OK  no 비전 in history.html
)

if exist about\vision.html echo   FAIL  about\vision.html exists — delete it
if exist about\partners.html echo   FAIL  about\partners.html exists — delete it
if exist about\news.html echo   FAIL  about\news.html exists — delete it

echo.
echo [2] Server on port 8080
netstat -ano | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
  echo   WARN  No server on 8080 — run serve.bat first, then run diagnose.bat again
  goto end
)

echo   OK  Something is listening on 8080

echo.
echo [3] Live response from http://127.0.0.1:8080/about/history.html
powershell -NoProfile -Command ^
  "try { " ^
  "$r = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/about/history.html' -UseBasicParsing; " ^
  "$c = $r.Content; " ^
  "if ($c -match '20250629-menu-v2') { Write-Host '   OK  Server returns NEW build marker' } else { Write-Host '   FAIL  Server returns OLD page (wrong folder or cache server?)' }; " ^
  "if ($c -match 'AIAN 소개') { Write-Host '   OK  Server returns AIAN 소개 menu' } else { Write-Host '   FAIL  Server missing AIAN 소개' }; " ^
  "if ($c -match '비전') { Write-Host '   FAIL  Server still returns OLD 비전 menu' } else { Write-Host '   OK  No 비전 in server response' }; " ^
  "if ($r.Headers['Cache-Control'] -match 'no-store') { Write-Host '   OK  no-store cache header' } else { Write-Host '   WARN  Server may be python -m http.server — use serve.bat!' } " ^
  "} catch { Write-Host '   FAIL  Cannot reach server:' $_.Exception.Message }"

echo.
echo [4] If browser still looks OLD but [3] is OK:
echo   - Close ALL tabs for 127.0.0.1 and localhost
echo   - Open InPrivate/Incognito window
echo   - Go to: http://127.0.0.1:8080/about/history.html
echo   - Bottom-right must show: ABOUT 20250629-menu-v2

:end
echo.
pause
