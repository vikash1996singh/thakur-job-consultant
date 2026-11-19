@echo off
title Thakur Job Consultancy Dev Server
cd /d "%~dp0"
echo ==========================================================
echo Starting Thakur Job Consultancy on http://localhost:3000 ...
echo ==========================================================
"C:\Users\toxic\.gradle\nodejs\node-v26.2.0-win-x64\node.exe" "node_modules\vite\bin\vite.js" --port 3000 --open
pause

