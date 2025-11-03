const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

class RFIDReader {
  constructor() {
    this.port = null;
    this.parser = null;
    this.isConnected = false;
    this.onCardRead = null;
  }

  // Initialize RFID reader connection
  async initialize(portPath, baudRate = 9600) {
    try {
      this.port = new SerialPort({
        path: portPath,
        baudRate: baudRate,
        autoOpen: false
      });

      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

      // Handle port opening
      this.port.on('open', () => {
        console.log('RFID Reader connected on', portPath);
        this.isConnected = true;
      });

      // Handle port errors
      this.port.on('error', (err) => {
        console.error('RFID Reader error:', err);
        this.isConnected = false;
      });

      // Handle data from RFID reader
      this.parser.on('data', (data) => {
        this.handleCardData(data.trim());
      });

      // Open the port
      await new Promise((resolve, reject) => {
        this.port.open((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize RFID reader:', error);
      return false;
    }
  }

  // Handle card data received from RFID reader
  handleCardData(data) {
    try {
      // Clean and validate card ID
      const cardId = data.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
      
      if (cardId.length >= 8) { // Minimum card ID length
        console.log('RFID Card detected:', cardId);
        
        if (this.onCardRead) {
          this.onCardRead(cardId);
        }
      } else {
        console.log('Invalid card data received:', data);
      }
    } catch (error) {
      console.error('Error processing card data:', error);
    }
  }

  // Set callback for when a card is read
  setCardReadCallback(callback) {
    this.onCardRead = callback;
  }

  // Get available serial ports
  static async getAvailablePorts() {
    try {
      const ports = await SerialPort.list();
      return ports.map(port => ({
        path: port.path,
        manufacturer: port.manufacturer,
        serialNumber: port.serialNumber,
        pnpId: port.pnpId
      }));
    } catch (error) {
      console.error('Error getting serial ports:', error);
      return [];
    }
  }

  // Test RFID reader connection
  async testConnection() {
    if (!this.isConnected) {
      return { success: false, message: 'RFID reader not connected' };
    }

    try {
      // Send test command (varies by RFID reader model)
      this.port.write('AT\r\n');
      
      return { success: true, message: 'RFID reader connection test successful' };
    } catch (error) {
      return { success: false, message: 'RFID reader test failed: ' + error.message };
    }
  }

  // Close RFID reader connection
  async close() {
    try {
      if (this.port && this.isConnected) {
        await new Promise((resolve) => {
          this.port.close(() => {
            this.isConnected = false;
            console.log('RFID Reader disconnected');
            resolve();
          });
        });
      }
      return true;
    } catch (error) {
      console.error('Error closing RFID reader:', error);
      return false;
    }
  }

  // Get connection status
  getStatus() {
    return {
      connected: this.isConnected,
      port: this.port ? this.port.path : null
    };
  }
}

module.exports = RFIDReader;



