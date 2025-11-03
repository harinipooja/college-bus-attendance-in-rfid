const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus-attendance');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@college.edu',
      password: 'admin123',
      role: 'super_admin',
      permissions: {
        canManageStudents: true,
        canManageBuses: true,
        canViewReports: true,
        canManageAttendance: true
      },
      profile: {
        firstName: 'System',
        lastName: 'Administrator',
        phone: '1234567890',
        department: 'IT'
      }
    });

    await admin.save();
    console.log('Default admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();



