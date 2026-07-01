@echo off
cd /d "%~dp0"
echo === AIAN CMS environment check ===
echo.

call "%~dp0_ensure-node.bat"

if defined NODEJS_DIR (
  echo [OK] NODEJS_DIR=%NODEJS_DIR%
) else (
  echo [FAIL] NODEJS_DIR not set
)

if defined NPM_CMD (
  echo [OK] NPM_CMD=%NPM_CMD%
) else (
  echo [FAIL] NPM_CMD not set
)

echo.
if defined NODEJS_DIR if exist "%NODEJS_DIR%\node.exe" (
  echo Node:
  "%NODEJS_DIR%\node.exe" -v
) else (
  echo [FAIL] node.exe
)

if defined NPM_CMD (
  echo npm:
  call "%NPM_CMD%" -v
) else (
  echo [FAIL] npm
)

echo.
if exist cms\package.json (echo [OK] cms\) else (echo [FAIL] cms\)
if exist web\package.json (echo [OK] web\) else (echo [FAIL] web\)
if exist cms\.env (echo [OK] cms\.env) else (echo [FAIL] cms\.env — run setup-cms-env.bat)
if exist web\.env.local (echo [OK] web\.env.local) else (echo [WARN] web\.env.local missing — start-cms.bat creates it)

echo.
if defined NPM_CMD if exist cms\.env (
  echo Testing Strapi API...
  powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:1337/api/home-page?locale=ko' -UseBasicParsing -TimeoutSec 8; if ($r.StatusCode -eq 200) { Write-Host '[OK] Strapi API at http://127.0.0.1:1337' } else { Write-Host '[FAIL] Strapi returned' $r.StatusCode } } catch { Write-Host '[FAIL] Strapi API not reachable — run start-cms.bat and wait for Strapi started' }"
) else if defined NPM_CMD (
  echo Run: setup-cms-env.bat   then   start-cms.bat
) else (
  echo Run: fix-node-path.bat
)
echo.
pause
