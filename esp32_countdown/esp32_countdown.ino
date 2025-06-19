#include <TM1637Display.h>

// Define the connections pins for TM1637
#define CLK_PIN 22  // CLK pin of TM1637 connected to GPIO22
#define DIO_PIN 21  // DIO pin of TM1637 connected to GPIO21

// Create a TM1637Display object
TM1637Display display(CLK_PIN, DIO_PIN);

// Variables to store time values
int currentTime = 0;
String inputString = "";
boolean stringComplete = false;

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  
  // Initialize the display
  display.setBrightness(5); // Set brightness (0-7)
  display.clear();
  
  // Show initial display
  display.showNumberDecEx(0, 0x40, true); // Show 00:00 with colon
}

void loop() {
  // Check for incoming serial data
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      stringComplete = true;
    } else {
      inputString += inChar;
    }
  }

  // Process complete message
  if (stringComplete) {
    currentTime = inputString.toInt();
    
    // Display the time
    int minutes = currentTime / 60;
    int seconds = currentTime % 60;
    int displayValue = minutes * 100 + seconds;
    
    // Update display with colon
    display.showNumberDecEx(displayValue, 0x40, true);
    
    // Send acknowledgment
    Serial.println("OK");
    
    // Clear for next message
    inputString = "";
    stringComplete = false;
  }
}