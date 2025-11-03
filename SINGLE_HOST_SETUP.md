# Single Host Setup Guide

This guide explains how to run the College Bus Attendance System on a single host with the backend serving the frontend.

## Quick Start

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB running on `mongodb://localhost:27017`
3. All dependencies installed (`npm install` in root and client directories)

### Running in Production Mode (Single Host)

#### Option 1: Using the provided script (Recommended)
```bash
# Windows
start.bat
```

This script will:
- Check if the frontend is built
- Build it if necessary
- Start the server in production mode
- Serve both frontend and backend from port 5000

#### Option 2: Manual setup
```bash
# 1. Build the frontend
npm run build

# 2. Set production environment
set NODE_ENV=production

# 3. Start the server
npm start
```

## How It Works

In production mode:
1. The React app is built into static files in `client/build/`
2. Express serves these static files from `server.js`
3. All routes go to the Express server
4. API calls are handled by `/api/*` routes
5. All other routes serve the React SPA

### Server Configuration

The `server.js` file checks for `NODE_ENV=production`:

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
```

## Accessing the Application

Once running, access the application at:
- **Main Application**: http://localhost:5000
- **API Endpoints**: http://localhost:5000/api/*

## Default Credentials

### Admin Login
- Username: `admin`
- Password: `admin123`

### Student Login
- Student ID: `STU001`
- RFID Card ID: `RFID001`

## Environment Configuration

The system uses `config.env` for configuration:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Set to 'production' for single host mode

## Development vs Production

### Development Mode
- React dev server runs on port 3000
- Backend API runs on port 5000
- Hot reload enabled
- Requires two terminals

### Production Mode (Single Host)
- Everything runs on port 5000
- React app served as static files
- Optimized build
- Single process
- Better for deployment

## Deployment

To deploy to a production server:
1. Ensure MongoDB is accessible
2. Update `config.env` with production values
3. Run `npm run build` to create production build
4. Start with `start.bat` or set `NODE_ENV=production` and run `npm start`
5. Consider using a process manager like PM2

## Troubleshooting

### Port Already in Use
If port 5000 is in use, change `PORT` in `config.env` to a different port.

### MongoDB Connection Issues
Ensure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Frontend Not Loading
Ensure the build exists:
```bash
npm run build
```

### API Calls Failing
Check that the server is running and MongoDB is connected. Check the console for error messages.

## Security Notes

1. Change `JWT_SECRET` in `config.env` to a strong, random value
2. Use HTTPS in production
3. Set up proper MongoDB authentication
4. Configure firewall rules appropriately
5. Keep dependencies updated

## Support

For issues or questions:
1. Check the console for error messages
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check the README.md for detailed instructions

