@echo off
cd /d "%~dp0"
if not exist "assets" mkdir "assets"

set "SRC1=%USERPROFILE%\Downloads\웹사이트.mp4"
set "SRC2=%USERPROFILE%\Downloads\website.mp4"
set "DEST=assets\hero-bg.mp4"

if exist "%SRC1%" (
  copy /Y "%SRC1%" "%DEST%"
  echo OK: 동영상 복사 완료 - %DEST%
  goto :done
)
if exist "%SRC2%" (
  copy /Y "%SRC2%" "%DEST%"
  echo OK: 동영상 복사 완료 - %DEST%
  goto :done
)

echo.
echo [오류] 동영상 파일을 찾을 수 없습니다.
echo 다음 위치에 mp4 파일이 있는지 확인하세요:
echo   %SRC1%
echo.
echo 파일 탐색기에서 mp4를 찾은 뒤, assets 폴더에 hero-bg.mp4 로 붙여넣으세요.
echo   %CD%\assets\
echo.

:done
pause
