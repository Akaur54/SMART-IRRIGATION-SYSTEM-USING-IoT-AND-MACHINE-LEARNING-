#define PUMP_PIN 2
int sensorPin = A0;
int sensorValue = 0;
String command = "";

void setup() {
  Serial.begin(9600);
  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, LOW);
}

void loop() {
  // Read the soil moisture sensor value
  sensorValue = analogRead(sensorPin);
  sensorValue = map(sensorValue, 0, 1023, 255, 0);
  Serial.print("Soil Moisture Level: ");
  Serial.println(sensorValue);

  // Check for commands from Python
  if (Serial.available() > 0) {
    command = Serial.readStringUntil('\n');
    command.trim();
    if (command == "PUMP_ON") {
      digitalWrite(PUMP_PIN, HIGH);
      Serial.println("The Water Pump is ON!");
    } else if (command == "PUMP_OFF") {
      digitalWrite(PUMP_PIN, LOW);
      Serial.println("The Water Pump is OFF!");
    }
  }

  delay(10000);
}