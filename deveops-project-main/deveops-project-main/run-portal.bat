@echo off
title CivicPulse Public Grievance Portal
echo ======================================================
echo  Starting CivicPulse Portal on http://localhost:3000
echo  8 Screens, 4 User Roles & 4 Reports Active!
echo ======================================================
timeout /t 2 /nobreak >nul
start http://localhost:3000
node standalone-server.js
pause
