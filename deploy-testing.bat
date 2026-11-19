@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   THAKUR JOB CONSULTANCY - DEPLOY TO TESTING (STAGING)
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking current branch...
git checkout staging 2>nul
if %errorlevel% neq 0 (
    echo Creating staging branch...
    git checkout -b staging
)

echo [2/4] Adding all latest changes...
git add .

set /p commit_msg="Enter commit message (Press Enter for default): "
if "!commit_msg!"=="" set commit_msg=Update staging test build %date% %time%

echo [3/4] Committing changes...
git commit -m "!commit_msg!"

echo [4/4] Pushing to GitHub (staging branch)...
git push -u origin staging

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS: Changes pushed to STAGING branch!
    echo   Your Testing Preview URL will update automatically!
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Please check your internet connection or git login.
)

echo.
pause
