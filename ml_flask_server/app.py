 
# import numpy as np
# import joblib
# from flask_cors import CORS
# from flask import Flask, request, jsonify

# app = Flask(__name__)
# CORS(app)

# # Load the model
# model = joblib.load('logistic_regression_model.pkl')

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json(force=True)
        
#         # Extract features directly from the data, setting default values for missing attributes
#         features = np.array([
#             data.get('SoilMoisture', 0), 
#             data.get('temperature', 0), 
#             data.get('Humidity', 0), 
#             data.get('Crop_Coffee', 0), 
#             data.get('Crop_Garden Flowers', 0), 
#             data.get('Crop_Groundnuts', 0), 
#             data.get('Crop_Maize', 0), 
#             data.get('Crop_Paddy', 0), 
#             data.get('Crop_Potato', 0), 
#             data.get('Crop_Pulse', 0), 
#             data.get('Crop_Sugarcane', 0), 
#             data.get('Crop_Wheat', 0),
#             data.get('CropType_cotton', 0)
#         ]).reshape(1, -1)
        
#         # Make prediction
#         prediction = model.predict(features)
        
#         # Convert prediction to a standard Python integer
#         prediction_int = int(prediction[0])
        
#         # Return prediction
#         return jsonify({'prediction': prediction_int})
#     except Exception as e:
#         # Log the error
#         print(f"Error occurred: {e}")
#         return jsonify({'error': str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

import numpy as np
import joblib
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('randomforest.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # Extract features directly from the data using the correct column names
        features = np.array([
            data.get('SoilMoisture', 0),        # Correct column name for soil moisture
            data.get('temperature', 0),         # Correct column name for temperature
            data.get('Humidity', 0),            # Correct column name for humidity
            data.get('Coffee', 0),              # Correct crop column names
            data.get('Garden Flowers', 0),
            data.get('Groundnuts', 0),
            data.get('Maize', 0),
            data.get('Paddy', 0),
            data.get('Potato', 0),
            data.get('Pulse', 0),
            data.get('Sugarcane', 0),
            data.get('Wheat', 0),
            data.get('cotton', 0)               # Correct column name for cotton (lowercase)
        ]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)

        # Convert prediction to a standard Python integer
        prediction_int = int(prediction[0])

        # Return prediction
        return jsonify({'prediction': prediction_int})
    except Exception as e:
        # Log the error
        print(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)



from flask import Flask, jsonify, request
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace 'COM8' with your Arduino's port
arduino = serial.Serial('COM7', 9600, timeout=1)
time.sleep(2)  # Wait for the connection to initialize

@app.route('/read-soil-moisture', methods=['GET'])
def read_soil_moisture():
    if arduino.in_waiting > 0:
        data = arduino.readline().decode('utf-8').strip()
        if "Soil Moisture Level:" in data:
            moisture_value = data.split(": ")[1]
            return jsonify({"soilMoisture": moisture_value})
    return jsonify({"error": "No data available"})

@app.route('/control-pump', methods=['POST'])
def control_pump():
    data = request.json
    if data.get("prediction") == 1:
        arduino.write(b'ON\n')
        return jsonify({"message": "Pump turned ON"})
    else:
        arduino.write(b'OFF\n')
        return jsonify({"message": "Pump turned OFF"})

if __name__ == '__main__':
    app.run(port=5000)


# import numpy as np
# import joblib
# from flask_cors import CORS
# from flask import Flask, request, jsonify
# import serial
# import time

# app = Flask(__name__)
# CORS(app)

# # Load the model
# model = joblib.load('randomforest.pkl')

# # Initialize Arduino connection (update 'COM7' to your Arduino port)
# arduino = serial.Serial('COM7', 9600, timeout=1)
# time.sleep(2)  # Wait for the connection to initialize

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json(force=True)

#         # Extract features directly from the data using the correct column names
#         features = np.array([
#             data.get('SoilMoisture', 0),        # Correct column name for soil moisture
#             data.get('temperature', 0),         # Correct column name for temperature
#             data.get('Humidity', 0),            # Correct column name for humidity
#             data.get('Coffee', 0),              # Correct crop column names
#             data.get('Garden Flowers', 0),
#             data.get('Groundnuts', 0),
#             data.get('Maize', 0),
#             data.get('Paddy', 0),
#             data.get('Potato', 0),
#             data.get('Pulse', 0),
#             data.get('Sugarcane', 0),
#             data.get('Wheat', 0),
#             data.get('cotton', 0)               # Correct column name for cotton (lowercase)
#         ]).reshape(1, -1)

#         # Make prediction
#         prediction = model.predict(features)
#         prediction_int = int(prediction[0])

#         # Return prediction
#         return jsonify({'prediction': prediction_int})
#     except Exception as e:
#         print(f"Error occurred: {e}")
#         return jsonify({'error': str(e)}), 500

# @app.route('/read-soil-moisture', methods=['GET'])
# def read_soil_moisture():
#     if arduino.in_waiting > 0:
#         data = arduino.readline().decode('utf-8').strip()
#         if "Soil Moisture Level:" in data:
#             moisture_value = data.split(": ")[1]
#             return jsonify({"soilMoisture": moisture_value})
#     return jsonify({"error": "No data available"})

# @app.route('/control-pump', methods=['POST'])
# def control_pump():
#     data = request.json
#     if data.get("prediction") == 1:
#         arduino.write(b'ON\n')
#         return jsonify({"message": "Pump turned ON"})
#     else:
#         arduino.write(b'OFF\n')
#         return jsonify({"message": "Pump turned OFF"})

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
