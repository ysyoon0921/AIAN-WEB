@echo off
cd /d "%~dp0"
echo === Reset About Intro (fix broken cards) ===
echo.
echo Strapi must be STOPPED first (Ctrl+C in start-cms.bat window).
echo This deletes CMS database and recreates all content from seed.
echo Other CMS edits will also be reset.
echo.
pause

if exist "cms\.tmp\about-intro-components-v2" del /f /q "cms\.tmp\about-intro-components-v2"
if exist "cms\.tmp\about-intro-flat-fields-v1" del /f /q "cms\.tmp\about-intro-flat-fields-v1"

if exist "cms\.tmp\data.db" (
  del /f /q "cms\.tmp\data.db"
  echo Deleted cms\.tmp\data.db
)

echo.
echo Done. Run:  start-cms.bat
echo.
pause
