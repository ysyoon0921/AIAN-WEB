@echo off
cd /d "%~dp0web"
if not exist .env.local copy .env.local.example .env.local
echo Starting Next.js on http://localhost:3000
npm run dev
