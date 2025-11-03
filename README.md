# College Bus Attendance System with RFID Integration

A comprehensive bus attendance management system for colleges with RFID card integration, real-time tracking, and admin dashboard.

## Features

- 🚌 **Bus Management**: Add, edit, and manage bus routes and drivers
- 👥 **Student Management**: Register students and assign RFID cards
- 📱 **RFID Integration**: Real-time attendance tracking via RFID cards
- 📊 **Real-time Dashboard**: Live attendance monitoring and statistics
- 📈 **Reports & Analytics**: Comprehensive attendance reports
- 🔔 **Real-time Notifications**: Socket.io for live updates
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.io for real-time communication
- JWT authentication
- RFID reader integration

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Socket.io client for real-time updates
- Responsive CSS

## Prerequisites

Before running the application, make sure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MongoDB** (v4.4 or higher)
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud database)

3. **Git** (optional)
   - Download from [git-scm.com](https://git-scm.com/)

## Installation & Setup

### 1. Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd college-bus-attendance

# Or download and extract the ZIP file
```

### 2. Install Backend Dependencies
```bash
# Install server dependencies
npm install
```

### 3. Install Frontend Dependencies
```bash
# Navigate to client directory
cd client

# Install React dependencies
npm install

# Go back to root directory
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/bus-attendance
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 5. Database Setup

#### Option A: Local MongoDB
1. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### 6. Create Initial Admin User

Run this script to create the first admin user:
```bash
node scripts/createAdmin.js
```

Or manually add an admin user through the database.

## Running the Application

### Quick Start (Recommended - Single Host)

Simply run the provided script:
```bash
# Windows
run.bat

# Or for production mode
start.bat
```

This will:
1. Install all dependencies
2. Create admin user and sample data
3. Start both server and client

### Method 1: Development Mode (Two Terminals)

#### Terminal 1 - Start Backend Server
```bash
# From root directory
npm run dev
```

#### Terminal 2 - Start React Client
```bash
# From client directory
cd client
npm start
```

### Method 2: Production Mode (Single Host)

```bash
# Build React app
npm run build

# Start production server
start.bat
# or
set NODE_ENV=production
npm start
```

## Accessing the Application

### Development Mode
1. **Admin Dashboard**: http://localhost:3000
2. **API Endpoints**: http://localhost:5000/api

### Production Mode (Single Host)
1. **Application**: http://localhost:5000
2. **API Endpoints**: http://localhost:5000/api

## Default Login Credentials

### Admin Login
- **Username**: admin
- **Password**: admin123

### Student Login
- **Student ID**: STU001
- **RFID Card ID**: RFID001

## RFID Integration

### Hardware Requirements
- RFID Reader (USB or Serial)
- RFID Cards/Tags
- Computer with USB/Serial port

### Software Setup
1. Install RFID reader drivers
2. Connect RFID reader to computer
3. Update port configuration in `utils/rfidReader.js`
4. Test connection using the admin panel

### Supported RFID Readers
- USB RFID Readers
- Serial RFID Readers
- Arduino-based RFID modules

## API Endpoints

### Authentication
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/student/login` - Student login
- `GET /api/auth/verify` - Verify token

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Buses
- `GET /api/buses` - Get all buses
- `POST /api/buses` - Create bus
- `PUT /api/buses/:id` - Update bus
- `DELETE /api/buses/:id` - Delete bus

### Attendance
- `POST /api/attendance/rfid` - Record RFID attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/stats/overview` - Get attendance statistics

## Project Structure

```
college-bus-attendance/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.js
│   └── package.json
├── models/                 # Database models
├── routes/                 # API routes
├── utils/                  # Utility functions
├── server.js              # Main server file
├── package.json
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes using the port

3. **RFID Reader Not Working**
   - Check device drivers
   - Verify port configuration
   - Test with serial communication tools

4. **React App Not Loading**
   - Ensure all dependencies are installed
   - Check for JavaScript errors in browser console
   - Verify proxy configuration in package.json

### Getting Help

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check network connectivity

## Development

### Adding New Features
1. Create new routes in `/routes`
2. Add corresponding models in `/models`
3. Update frontend components
4. Test thoroughly

### Database Schema
- **Students**: Student information and RFID cards
- **Buses**: Bus details and routes
- **Attendance**: Attendance records
- **Admins**: Admin user accounts

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Test with the provided demo credentials



