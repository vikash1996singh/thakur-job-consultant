@echo off
setlocal enabledelayedexpansion

echo ================================================================
echo   THAKUR JOB CONSULTANCY - ENTERPRISE BACKEND API (SPRING BOOT)
echo ================================================================
echo.

cd /d "%~dp0"

:: Auto-detect and configure JDK 21
if exist "C:\Users\toxic\.gradle\jdks\azul_systems__inc_-21-amd64-windows.2\bin\java.exe" (
    set "JAVA_HOME=C:\Users\toxic\.gradle\jdks\azul_systems__inc_-21-amd64-windows.2"
    set "PATH=!JAVA_HOME!\bin;!PATH!"
)

:: Auto-detect and configure portable Maven
if exist "%~dp0apache-maven-3.9.6\bin\mvn.cmd" (
    set "MAVEN_CMD=%~dp0apache-maven-3.9.6\bin\mvn.cmd"
) else (
    set "MAVEN_CMD=mvn"
)

echo [1/2] Verifying Java environment...
java -version
if %errorlevel% neq 0 (
    echo [ERROR] Java not found. Please install JDK 17+.
    pause
    exit /b 1
)

echo.
echo [2/2] Starting Spring Boot REST API on port 8080...
echo   * Backend REST API: http://localhost:8080/api
echo   * Database: PostgreSQL (thakur_jobs_db)
echo.

call "!MAVEN_CMD!" spring-boot:run

pause
