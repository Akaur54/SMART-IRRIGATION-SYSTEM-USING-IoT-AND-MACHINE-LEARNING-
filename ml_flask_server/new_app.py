import numpy as np
import joblib
from flask_cors import CORS
from flask import Flask, request, jsonify
import serial
import time
import serial.tools.list_ports
import atexit

app = Flask(__name__)
CORS(app)

# Load the ML model
try:
    model = joblib.load('randomforest.pkl')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Function to connect to Arduino
def connect_to_arduino():
    print("Searching for Arduino...")
    usb_ports = [port.device for port in serial.tools.list_ports.comports() if 'USB' in port.description]
    for port in usb_ports:
        try:
            arduino = serial.Serial(port, 9600, timeout=1)
            time.sleep(2)  # Allow time for connection
            print(f"Arduino connected on port {port}")
            return arduino
        except serial.SerialException as e:
            print(f"Failed to connect on port {port}: {e}")
    print("No Arduino found.")
    return None

arduino = connect_to_arduino()

# Close Arduino connection on exit
def close_arduino():
    if arduino and arduino.is_open:
        arduino.close()
        print("Closed Arduino connection.")

atexit.register(close_arduino)

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json(force=True)
        features = np.array([
            data.get('SoilMoisture', 0),
            data.get('temperature', 0),
            data.get('Humidity', 0),
            *[data.get(crop, 0) for crop in [
                'Coffee', 'Garden Flowers', 'Groundnuts', 'Maize', 'Paddy',
                'Potato', 'Pulse', 'Sugarcane', 'Wheat', 'Cotton'
            ]]
        ]).reshape(1, -1)

        prediction = model.predict(features)

        if arduino:
            command = "PUMP_ON\n" if int(prediction[0]) == 1 else "PUMP_OFF\n"
            arduino.write(command.encode())
            print(f"Sent '{command.strip()}' to Arduino.")
            time.sleep(1)  # Give Arduino time to respond

            # Attempt to read confirmation from Arduino
            if arduino.in_waiting > 0:
                response = arduino.readline().decode('utf-8').strip()
                print(f"Arduino response: {response}")

        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/read-soil-moisture', methods=['GET'])
def read_soil_moisture():
    if arduino:
        try:
            arduino.write(b"READ_SOIL\n")
            time.sleep(1)  # Wait for Arduino to respond
            if arduino.in_waiting > 0:
                data = arduino.readline().decode('utf-8').strip()
                print(f"Data from Arduino: {data}")

                if "Soil Moisture Level:" in data:
                    moisture_value = data.split(": ")[1]
                    return jsonify({"soilMoisture": moisture_value})
            else:
                print("No data waiting in serial buffer.")
        except Exception as e:
            print(f"Arduino read error: {e}")
            return jsonify({"error": "Arduino read failed"}), 500
    return jsonify({"error": "No data or Arduino not connected"})

@app.route('/control-pump', methods=['POST'])
def control_pump():
    if arduino:
        data = request.json
        try:
            command = "PUMP_ON\n" if data['prediction'] == 1 else "PUMP_OFF\n"
            arduino.write(command.encode())
            print(f"Manual pump control: Sent '{command.strip()}' to Arduino.")
            
            # Read confirmation from Arduino
            time.sleep(1)
            if arduino.in_waiting > 0:
                response = arduino.readline().decode('utf-8').strip()
                print(f"Arduino response: {response}")

            return jsonify({'status': 'Pump command sent'})
        except Exception as e:
            print(f"Pump control error: {e}")
            return jsonify({'error': 'Pump control failed'}), 500
    return jsonify({'error': 'Arduino not connected'}), 500

if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)
