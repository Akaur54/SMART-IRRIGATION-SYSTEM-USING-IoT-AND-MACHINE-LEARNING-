// server.js
const express = require('express');
const {SerialPort} = require('serialport');
const app = express();
const port = 3001;

app.use(express.json());

// Replace with your Arduino's port
const arduinoPort = new SerialPort({
    path: 'COM8', // Change this to your Arduino's port
    baudRate: 9600,
});

// Endpoint to receive data from React app
app.post('/send-to-arduino', (req, res) => {
    const output = req.body.output; // Expecting output data from React
    
    // Send data to Arduino
    arduinoPort.write(output, (err) => {
        if (err) {
            return res.status(500).send('Error sending data to Arduino');
        }
        res.send('Data sent to Arduino');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});