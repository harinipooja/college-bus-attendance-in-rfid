# Quick Setup Guide

## Prerequisites
Before running the application, you need to install:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open command prompt and type `node --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud database) for free

## Quick Start (Windows)

### Method 1: Using the Batch File (Easiest)
1. Double-click `run.bat`
2. Wait for installation and setup to complete
3. The application will open automatically in your browser

### Method 2: Manual Setup
1. Open Command Prompt as Administrator
2. Navigate to the project folder
3. Run these commands one by one:

```cmd
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create admin user
node scripts/createAdmin.js

# Create sample data
node scripts/seedData.js

# Start backend server (in one terminal)
npm run dev

# Start frontend (in another terminal)
cd client
npm start
```

## Quick Start (Mac/Linux)

### Method 1: Using the Shell Script
```bash
# Make the script executable
chmod +x run.sh

# Run the script
./run.sh
```

### Method 2: Manual Setup
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create admin user
node scripts/createAdmin.js

# Create sample data
node scripts/seedData.js

# Start backend server (in one terminal)
npm run dev

# Start frontend (in another terminal)
cd client
npm start
```

## Access the Application

1. **Admin Dashboard**: http://localhost:3000
2. **API**: http://localhost:5000

## Default Login Credentials

### Admin Login
- **Username**: admin
- **Password**: admin123

### Student Login
- **Student ID**: STU001
- **RFID Card ID**: RFID001

## Troubleshooting

### If you get "node is not recognized" error:
1. Install Node.js from https://nodejs.org/
2. Restart your command prompt
3. Try again

### If you get "npm is not recognized" error:
1. Node.js should include npm
2. Try reinstalling Node.js
3. Restart your computer

### If MongoDB connection fails:
1. Make sure MongoDB is running
2. For Windows: Check Services and start MongoDB
3. For Mac/Linux: Run `sudo systemctl start mongod`

### If ports are already in use:
1. Close other applications using ports 3000 or 5000
2. Or change the ports in the configuration files

## What the Application Does

- **Student Management**: Add, edit, and manage student information
- **Bus Management**: Manage bus routes and drivers
- **RFID Attendance**: Track attendance using RFID cards
- **Real-time Dashboard**: Monitor attendance in real-time
- **Reports**: Generate attendance reports
- **Mobile Friendly**: Works on phones and tablets

## Next Steps

1. Add your own students and buses
2. Configure RFID readers
3. Customize the system for your college
4. Set up email notifications (optional)

## Need Help?

- Check the full README.md for detailed documentation
- Review error messages in the console
- Ensure all prerequisites are installed
- Try running the setup commands one by one



