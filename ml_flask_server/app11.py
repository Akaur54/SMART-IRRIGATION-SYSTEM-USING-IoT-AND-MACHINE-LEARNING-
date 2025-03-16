from flask import Flask, jsonify
import serial
import time

# Initialize Flask app
app = Flask(__name__)

# Singleton for Arduino connection
arduino = None

def get_arduino_connection():
    global arduino
    if arduino is None:
        try:
            arduino = serial.Serial('COM7', 9600, timeout=1)  # Replace 'COM7' with your actual port
            time.sleep(2)  # Allow time for the connection to initialize
            print("Connected to Arduino on COM7")
        except serial.SerialException:
            print("Failed to connect to Arduino")
    return arduino

@app.route('/on', methods=['GET'])
def turn_on():
    arduino_conn = get_arduino_connection()
    if arduino_conn:
        arduino_conn.write(b"ON\n")  # Send "ON" command
        return jsonify({"status": "LED turned on"}), 200
    else:
        return jsonify({"error": "Failed to connect to Arduino"}), 500

@app.route('/off', methods=['GET'])
def turn_off():
    arduino_conn = get_arduino_connection()
    if arduino_conn:
        arduino_conn.write(b"OFF\n")  # Send "OFF" command
        return jsonify({"status": "LED turned off"}), 200
    else:
        return jsonify({"error": "Failed to connect to Arduino"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True, use_reloader=False)




