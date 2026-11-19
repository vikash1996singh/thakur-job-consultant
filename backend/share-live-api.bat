@echo off
echo ================================================================
echo   THAKUR JOB CONSULTANCY - CREATE LIVE PUBLIC SWAGGER LINK
echo ================================================================
echo.
echo Connecting to secure tunnel...
echo Share the generated HTTPS link below with your tester/client!
echo (Keep this window open while they are testing)
echo.

ssh -o StrictHostKeyChecking=no -R 80:localhost:8080 nokey@localhost.run

pause
