#!/bin/bash

echo "Starting College Bus Attendance System..."
echo

echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo
echo "Installing frontend dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi
cd ..

echo
echo "Creating admin user..."
node scripts/createAdmin.js

echo
echo "Creating sample data..."
node scripts/seedData.js

echo
echo "Starting the application..."
echo
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo
echo "Press Ctrl+C to stop the application"
echo

# Start backend in background
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
cd client
npm start &
FRONTEND_PID=$!

echo "Application started successfully!"
echo
echo "Default Login Credentials:"
echo "Admin: username=admin, password=admin123"
echo "Student: studentId=STU001, rfidCardId=RFID001"
echo

# Function to cleanup on exit
cleanup() {
    echo "Stopping application..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait



