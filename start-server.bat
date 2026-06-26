@echo off
cd /d "%~dp0"
echo AIAN 웹사이트 서버 시작...
echo 브라우저에서 http://127.0.0.1:8080/ 를 여세요.
echo 종료: Ctrl+C
python -m http.server 8080
pause
