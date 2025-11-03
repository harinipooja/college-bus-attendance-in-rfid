const QRCode = require('qrcode');

class QRGenerator {
  // Generate QR code for student
  static async generateStudentQR(studentData) {
    try {
      const qrData = {
        type: 'student',
        studentId: studentData.studentId,
        name: studentData.name,
        rfidCardId: studentData.rfidCardId,
        busId: studentData.busId,
        timestamp: new Date().toISOString()
      };

      const qrString = JSON.stringify(qrData);
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return {
        success: true,
        qrCode: qrCodeDataURL,
        qrData: qrString
      };
    } catch (error) {
      console.error('Error generating student QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate QR code for bus
  static async generateBusQR(busData) {
    try {
      const qrData = {
        type: 'bus',
        busId: busData._id,
        busNumber: busData.busNumber,
        route: busData.route,
        rfidReaderId: busData.rfidReaderId,
        timestamp: new Date().toISOString()
      };

      const qrString = JSON.stringify(qrData);
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return {
        success: true,
        qrCode: qrCodeDataURL,
        qrData: qrString
      };
    } catch (error) {
      console.error('Error generating bus QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate QR code for attendance
  static async generateAttendanceQR(attendanceData) {
    try {
      const qrData = {
        type: 'attendance',
        studentId: attendanceData.studentId,
        busId: attendanceData.busId,
        attendanceType: attendanceData.attendanceType,
        timestamp: new Date().toISOString()
      };

      const qrString = JSON.stringify(qrData);
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return {
        success: true,
        qrCode: qrCodeDataURL,
        qrData: qrString
      };
    } catch (error) {
      console.error('Error generating attendance QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Parse QR code data
  static parseQRData(qrString) {
    try {
      const qrData = JSON.parse(qrString);
      return {
        success: true,
        data: qrData
      };
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate QR code with custom options
  static async generateCustomQR(data, options = {}) {
    try {
      const defaultOptions = {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      };

      const finalOptions = { ...defaultOptions, ...options };
      const qrCodeDataURL = await QRCode.toDataURL(data, finalOptions);

      return {
        success: true,
        qrCode: qrCodeDataURL
      };
    } catch (error) {
      console.error('Error generating custom QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate multiple QR codes for batch processing
  static async generateBatchQRCodes(items, type = 'student') {
    try {
      const results = [];
      
      for (const item of items) {
        let qrResult;
        
        switch (type) {
          case 'student':
            qrResult = await this.generateStudentQR(item);
            break;
          case 'bus':
            qrResult = await this.generateBusQR(item);
            break;
          default:
            qrResult = await this.generateCustomQR(JSON.stringify(item));
        }
        
        results.push({
          item,
          qrCode: qrResult.success ? qrResult.qrCode : null,
          error: qrResult.success ? null : qrResult.error
        });
      }

      return {
        success: true,
        results
      };
    } catch (error) {
      console.error('Error generating batch QR codes:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = QRGenerator;



