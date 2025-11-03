const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  attendanceType: {
    type: String,
    enum: ['boarding', 'alighting'],
    required: true
  },
  rfidCardId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ''
  },
  deviceInfo: {
    deviceId: String,
    deviceType: String,
    appVersion: String
  },
  isLate: {
    type: Boolean,
    default: false
  },
  lateReason: {
    type: String,
    default: ''
  }
});

// Index for efficient queries
attendanceSchema.index({ studentId: 1, timestamp: -1 });
attendanceSchema.index({ busId: 1, timestamp: -1 });
attendanceSchema.index({ rfidCardId: 1, timestamp: -1 });

module.exports = mongoose.model('Attendance', attendanceSchema);

