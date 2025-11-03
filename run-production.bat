@echo off
echo Starting College Bus Attendance System in Production Mode...
echo.

echo Building frontend...
cd client
call npm run build
cd ..

echo.
echo Starting production server...
echo Server will run on: http://localhost:5000
echo.
echo Default Login Credentials:
echo Admin: username=admin, password=admin123
echo Student: studentId=STU001, rfidCardId=RFID001
echo.
echo Press Ctrl+C to stop the application
echo.

set NODE_ENV=production
start "Production Server" cmd /k "npm start"

pause

