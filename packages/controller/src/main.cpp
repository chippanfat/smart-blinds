#include <WiFiNINA.h>

//please enter your sensitive data in the Secret tab
char ssid[] = "";                // your network SSID (name)
char pass[] = "";           // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;              // the Wi-Fi radio's status
int ledState = LOW;                       //ledState used to set the LED
WiFiSSLClient client;                     // Connection handler

void runClientConnectionLEDSequence() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial);

  // set the LED as output
  pinMode(LED_BUILTIN, OUTPUT);

  // attempt to connect to Wi-Fi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to network: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // Use to debug when we don't have the serial monitor
    digitalWrite(LED_BUILTIN, HIGH);

    // wait 10 seconds for connection:
    delay(10000);
  }

  digitalWrite(LED_BUILTIN, LOW);

  // you're connected now, so print out the data:
  Serial.println("You're connected to the network");
  Serial.println("---------------------------------------");
  Serial.println(WiFi.localIP());
}

void loop() {
  while (client.available()) {
    // https://help.ubidots.com/en/articles/3383755-connect-the-arduino-nano-33-iot-with-ubidots-over-http
    char c = client.read();
    Serial.print(c);
  }


}
