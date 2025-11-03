@echo off
echo Starting College Bus Attendance System...
echo.

echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Creating admin user...
call node scripts/createAdmin.js

echo.
echo Creating sample data...
call node scripts/seedData.js

echo.
echo Starting the application...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

start "Backend Server" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend Client" cmd /k "cd client && npm start"

echo Application started successfully!
echo.
echo Default Login Credentials:
echo Admin: username=admin, password=admin123
echo Student: studentId=STU001, rfidCardId=RFID001
echo.
pause



