const mongoose = require('mongoose');
const Student = require('../models/Student');
const Bus = require('../models/Bus');
const Attendance = require('../models/Attendance');
require('dotenv').config();

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus-attendance');
    console.log('Connected to MongoDB');

    // Create sample buses
    const bus1 = new Bus({
      busNumber: 'BUS001',
      driverName: 'John Smith',
      driverPhone: '9876543210',
      conductorName: 'Mike Johnson',
      conductorPhone: '9876543211',
      route: 'Downtown to College',
      capacity: 50,
      rfidReaderId: 'READER001',
      schedule: {
        morning: {
          departureTime: '07:00',
          arrivalTime: '08:30'
        },
        evening: {
          departureTime: '17:00',
          arrivalTime: '18:30'
        }
      }
    });

    const bus2 = new Bus({
      busNumber: 'BUS002',
      driverName: 'Sarah Wilson',
      driverPhone: '9876543212',
      conductorName: 'David Brown',
      conductorPhone: '9876543213',
      route: 'Suburbs to College',
      capacity: 45,
      rfidReaderId: 'READER002',
      schedule: {
        morning: {
          departureTime: '07:15',
          arrivalTime: '08:45'
        },
        evening: {
          departureTime: '17:15',
          arrivalTime: '18:45'
        }
      }
    });

    await bus1.save();
    await bus2.save();
    console.log('Buses created');

    // Create sample students
    const students = [
      {
        studentId: 'STU001',
        name: 'Alice Johnson',
        email: 'alice@college.edu',
        phone: '9876543214',
        rfidCardId: 'RFID001',
        busId: bus1._id,
        boardingPoint: 'Downtown Station',
        dropPoint: 'College Main Gate',
        emergencyContact: {
          name: 'Robert Johnson',
          phone: '9876543215',
          relation: 'Father'
        }
      },
      {
        studentId: 'STU002',
        name: 'Bob Smith',
        email: 'bob@college.edu',
        phone: '9876543216',
        rfidCardId: 'RFID002',
        busId: bus1._id,
        boardingPoint: 'Central Park',
        dropPoint: 'College Main Gate',
        emergencyContact: {
          name: 'Mary Smith',
          phone: '9876543217',
          relation: 'Mother'
        }
      },
      {
        studentId: 'STU003',
        name: 'Carol Davis',
        email: 'carol@college.edu',
        phone: '9876543218',
        rfidCardId: 'RFID003',
        busId: bus2._id,
        boardingPoint: 'Suburb Station',
        dropPoint: 'College Back Gate',
        emergencyContact: {
          name: 'James Davis',
          phone: '9876543219',
          relation: 'Father'
        }
      },
      {
        studentId: 'STU004',
        name: 'David Wilson',
        email: 'david@college.edu',
        phone: '9876543220',
        rfidCardId: 'RFID004',
        busId: bus2._id,
        boardingPoint: 'Mall Area',
        dropPoint: 'College Back Gate',
        emergencyContact: {
          name: 'Lisa Wilson',
          phone: '9876543221',
          relation: 'Mother'
        }
      }
    ];

    const createdStudents = [];
    for (const studentData of students) {
      const student = new Student(studentData);
      await student.save();
      createdStudents.push(student);
    }
    console.log('Students created');

    // Create sample attendance records
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const attendanceRecords = [
      {
        studentId: createdStudents[0]._id,
        busId: bus1._id,
        attendanceType: 'boarding',
        rfidCardId: 'RFID001',
        timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        verified: true
      },
      {
        studentId: createdStudents[1]._id,
        busId: bus1._id,
        attendanceType: 'boarding',
        rfidCardId: 'RFID002',
        timestamp: new Date(today.getTime() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
        verified: true
      },
      {
        studentId: createdStudents[2]._id,
        busId: bus2._id,
        attendanceType: 'boarding',
        rfidCardId: 'RFID003',
        timestamp: new Date(today.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
        verified: true
      },
      {
        studentId: createdStudents[0]._id,
        busId: bus1._id,
        attendanceType: 'alighting',
        rfidCardId: 'RFID001',
        timestamp: new Date(today.getTime() - 30 * 60 * 1000), // 30 minutes ago
        verified: true
      }
    ];

    for (const attendanceData of attendanceRecords) {
      const attendance = new Attendance(attendanceData);
      await attendance.save();
    }
    console.log('Sample attendance records created');

    console.log('\nSample data created successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin: username=admin, password=admin123');
    console.log('Student: studentId=STU001, rfidCardId=RFID001');
    console.log('Student: studentId=STU002, rfidCardId=RFID002');
    console.log('Student: studentId=STU003, rfidCardId=RFID003');
    console.log('Student: studentId=STU004, rfidCardId=RFID004');

  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedData();



