@echo off
cd /d "%~dp0"
echo === Reset About Intro cards ===
echo.
echo This fixes "components are not related to the entity" in Strapi.
echo Strapi must be STOPPED first (Ctrl+C in start-cms.bat window).
echo.
pause

if exist "cms\.tmp\data.db" (
  echo Deleting cms\.tmp\data.db ...
  del /f /q "cms\.tmp\data.db"
  echo Done. Run start-cms.bat to recreate CMS data from seed.
) else (
  echo cms\.tmp\data.db not found — run start-cms.bat, it will reseed on boot.
)
echo.
pause
