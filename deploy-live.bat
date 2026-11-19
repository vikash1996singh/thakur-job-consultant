@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   THAKUR JOB CONSULTANCY - DEPLOY TO LIVE (PRODUCTION)
echo ========================================================
echo.
echo WARNING: This will update the LIVE website accessible by all users!
echo Make sure you have verified all changes on the Testing URL.
echo.
set /p confirm="Do you want to deploy to LIVE Production? (Y/N): "
if /i not "!confirm!"=="Y" (
    echo [CANCELLED] Deployment aborted by user.
    pause
    exit /b 0
)

cd /d "%~dp0"

echo.
echo [1/5] Switching to main production branch...
git checkout main
if %errorlevel% neq 0 (
    echo [ERROR] Failed to switch to main branch.
    pause
    exit /b 1
)

echo [2/5] Pulling latest main changes...
git pull origin main

echo [3/5] Merging verified changes from staging into main...
git merge staging -m "Merge staging into main for live production release"

echo [4/5] Pushing to GitHub (main branch)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo [5/5] Returning to staging branch for further development...
    git checkout staging
    echo.
    echo ========================================================
    echo   SUCCESS: LIVE PRODUCTION DEPLOYMENT COMPLETE!
    echo   Your Live Website is now updated and live!
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push to main failed. Please check git status.
)

echo.
pause
