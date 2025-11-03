@echo off
echo ================================================
echo  College Bus Attendance System
echo  Single Host Production Mode
echo ================================================
echo.

REM Check if client/build exists
if not exist "client\build" (
    echo Building frontend for the first time...
    call npm run build
    echo.
)

echo Note: Make sure MongoDB is running on mongodb://localhost:27017
echo.
echo Starting server...
echo Server will be available at: http://localhost:5000
echo.
echo Default Login Credentials:
echo   Admin: username=admin, password=admin123
echo   Student: studentId=STU001, rfidCardId=RFID001
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

set NODE_ENV=production
node server.js

