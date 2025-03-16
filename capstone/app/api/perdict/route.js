const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Define your API key and the external API URL
const EXTERNAL_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${ApiKey}&units=metric'; // Replace with your external API URL
const API_KEY = 'd238ad9f66db9aa586be86c213309a23'; // Replace with your external API key

app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(EXTERNAL_API_URL, req.body, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const prediction = response.data.prediction; // Adjust based on API response format

    res.json({ prediction });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
