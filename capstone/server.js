// server.js
const express = require('express');
const cors = require('cors'); // Import cors to handle CORS issues
const SerialPort  = require('serialport');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Replace with your Arduino's port
const arduinoPort = new SerialPort({
    path: 'COM8', // Change this to your Arduino's port
    baudRate: 9600,
});

// Example variable to hold soil moisture data
let soilMoistureData = 0; // You would update this with actual readings

// Endpoint to receive data from React app
app.post('/sensor', (req, res) => {
    const output = req.body.output; // Expecting output data from React
    console.log('Received output:', output); // Log the received output

    // Send data to Arduino
    arduinoPort.write(output, (err) => {
        if (err) {
            return res.status(500).send('Error sending data to Arduino');
        }
        res.send('Data sent to Arduino');
    });
});

// New GET endpoint to fetch soil moisture data
app.get('/soilMoisture', (req, res) => {
    res.json({ soilMoisture: soilMoistureData }); // Send the soil moisture data as JSON
});

// Simulate updating soil moisture data (e.g., from Arduino)
setInterval(() => {
    soilMoistureData = Math.random() * 100; // Simulating soil moisture readings
}, 5000); // Update every 5 seconds

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
