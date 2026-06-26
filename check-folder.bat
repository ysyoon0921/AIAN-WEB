@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
echo.
echo === Where is the server running from? ===
echo %CD%
echo.
echo === assets folder contents ===
if exist "assets" (dir "assets") else (echo assets folder MISSING)
echo.
echo === index.html exists? ===
if exist "index.html" (echo YES) else (echo NO - wrong folder!)
echo.
echo === hero-bg.mp4 exists? ===
if exist "assets\hero-bg.mp4" (echo YES) else (echo NO)
echo.
pause
