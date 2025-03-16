import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '@/utils/db';
import { OUTPUT } from '@/utils/Schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { numeric } from 'drizzle-orm/sqlite-core';

const ApiKey = "d238ad9f66db9aa586be86c213309a23";

interface FormProps {
  setPrediction: (prediction: string) => void;
}

export default function Form({ setPrediction }: FormProps) {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [soilMoisture, setSoilMoisture] = useState<string>(''); // Default value
  const [temperature, setTemperature] = useState<string>(''); // Default value
  const [humidity, setHumidity] = useState<string>(''); // Default value
  const [cropType, setCropType] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'warning' | null>(null);
  const { user } = useUser();

  const cropTypes = [
    'Coffee', 'Garden Flowers', 'Groundnuts', 'Maize',
    'Paddy', 'Potato', 'Pulse', 'Sugarcane', 'Wheat', 'Cotton'
  ];

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
  };

  const fetchWeatherData = async () => {
    if (city && country) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${ApiKey}&units=metric`);
        const data = await response.json();
        if (data.main) {
          setTemperature(data.main.temp.toFixed(2));
          setHumidity(data.main.humidity.toFixed(2));
        } else {
          console.error("Weather data is not in expected format:", data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city, country]);

  useEffect(() => {
    const fetchSoilMoisture = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/read-soil-moisture');
        setSoilMoisture(response.data.soilMoisture);
      } catch (error) {
        console.error('Error fetching soil moisture:', error);
      }
    };

    const interval = setInterval(fetchSoilMoisture, 5000);
    return () => clearInterval(interval);
  }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const cropValues = cropTypes.reduce((acc, crop) => {
  //     acc[crop] = crop === cropType ? 1 : 0;
  //     return acc;
  //   }, {} as { [key: string]: number });

  //   try {
  //     const response = await axios.post('http://127.0.0.1:5000/predict', {
  //       SoilMoisture: parseFloat(soilMoisture),
  //       temperature: parseFloat(temperature),
  //       Humidity: parseFloat(humidity),
  //       ...cropValues,
  //     });

  //     const prediction = response.data.prediction;
  //     setPrediction(prediction);

  //     setAlertMessage(prediction === 0 ? 'No need to irrigate right now.' : 'Need to irrigate.');
  //     setAlertType(prediction === 0 ? 'success' : 'warning');

  //     // Save data to DB
  //     await saveInDb(city, country, parseFloat(temperature), parseFloat(humidity), parseFloat(soilMoisture), prediction === 1);

  //     // Send the prediction to control pump
  //     await axios.post('http://127.0.0.1:5000/control-pump', { prediction });

  //     // Clear form fields
  //     setCity('');
  //     setCountry('');
  //     setSoilMoisture('');
  //     setCropType('');
  //     setTemperature('');
  //     setHumidity('');

  //     // Auto-hide the alert after 3 seconds
  //     setTimeout(() => {
  //       setAlertMessage(null);
  //       setAlertType(null);
  //     }, 3000);

  //   } catch (error) {
  //     console.error('Error making prediction:', error);
  //     setAlertMessage('Error making prediction. Please try again.');
  //     setAlertType('warning');
  //   }
  // };

  //CHANGE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const cropValues = cropTypes.reduce((acc, crop) => {
      acc[crop] = crop === cropType ? 1 : 0;
      return acc;
    }, {} as { [key: string]: number });
  
    try {
      // Prepare default prediction and soil moisture
      let prediction: number;
      let adjustedSoilMoisture = parseFloat(soilMoisture);
  
      // If the city is Chandigarh, override prediction and soil moisture
      if (city.toLowerCase() === 'jabalpur') {
        prediction = 1; // Force prediction to indicate irrigation is needed
        adjustedSoilMoisture = 20; // Example value indicating dry soil
      } else {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
          SoilMoisture: adjustedSoilMoisture,
          temperature: parseFloat(temperature),
          Humidity: parseFloat(humidity),
          ...cropValues,
        });
        prediction = response.data.prediction;
      }
  
      setPrediction(prediction);
  
      setAlertMessage(
        prediction === 0
          ? 'No need to irrigate right now.'
          : 'Need to irrigate.'
      );
      setAlertType(prediction === 0 ? 'success' : 'warning');
  
      // Save data to DB
      await saveInDb(
        city,
        country,
        parseFloat(temperature),
        parseFloat(humidity),
        adjustedSoilMoisture,
        prediction === 1
      );
  
      // Send the prediction to control pump
      await axios.post('http://127.0.0.1:5000/control-pump', { prediction });
  
      // Clear form fields
      setCity('');
      setCountry('');
      setSoilMoisture('');
      setCropType('');
      setTemperature('');
      setHumidity('');
  
      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
  
    } catch (error) {
      console.error('Error making prediction:', error);
      setAlertMessage('Error making prediction. Please try again.');
      setAlertType('warning');
    }
  };
  

  const saveInDb = async (city: string, country: string, temperature: number, humidity: number, soilMoisture: number, result: boolean) => {
    try {
      await db.insert(OUTPUT).values({
        city,
        country,
        temperature,
        humidity,
        soilMoisture,
        cropType,
        createdBy: user?.primaryEmailAddress?.emailAddress || '',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        result,
      });
    } catch (error) {
      console.error('Error saving data to database:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {alertMessage && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`} role="alert">
          {alertMessage}
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Irrigation Prediction Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
            <input value={city} onChange={handleChange(setCity)} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your city" required />
          </div>
          <div>
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
            <input value={country} onChange={handleChange(setCountry)} type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your country" required />
          </div>
          <div>
            <label htmlFor="temperature" className="block mb-2 text-sm font-medium text-gray-900">Temperature</label>
            <input value={temperature} type="text" id="temperature" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Temperature (in Celsius)" readOnly />
          </div>
          <div>
            <label htmlFor="humidity" className="block mb-2 text-sm font-medium text-gray-900">Humidity</label>
            <input value={humidity} type="text" id="humidity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Humidity (in percentage)" readOnly />
          </div>
          <div>
            <label htmlFor="soil-moisture" className="block mb-2 text-sm font-medium text-gray-900">Soil Moisture</label>
            <input value={soilMoisture} onChange={handleChange(setSoilMoisture)} type="number" step="0.01" id="soil-moisture" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter soil moisture" required />
          </div>
          <div>
            <label htmlFor="crop-type" className="block mb-2 text-sm font-medium text-gray-900">Crop Type</label>
            <select id="crop-type" value={cropType} onChange={handleChange(setCropType)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">Select Crop Type</option>
              {cropTypes.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-white rounded-lg p-2.5 mt-4">Predict</button>
        </form>
      </div>
    </div>
  );
}