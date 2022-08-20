// https://randomnerdtutorials.com/esp32-web-server-arduino-ide/
#include <WiFiNINA.h>

//please enter your sensitive data in the Secret tab
char ssid[] = "NETGEAR16";                // your network SSID (name)
char pass[] = "littleriver683";           // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;              // the Wi-Fi radio's status
int ledState = LOW;                       //ledState used to set the LED
WiFiServer server(80);

struct PostData {
    String key;
    int percentage;
};

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

        // wait 1 seconds for connection:
        delay(1000);
    }

    digitalWrite(LED_BUILTIN, LOW);

    // you're connected now, so print out the data:
    Serial.println("You're connected to the network");
    Serial.println("---------------------------------------");
    Serial.println(WiFi.localIP());
    Serial.println();

    server.begin();
}

void sendHttpResponse(WiFiClient client, int statusCode) {
    client.println("HTTP/1.1 " + String(statusCode) + " OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();
}

int getContentLength(String header) {
    int contentLength = header.indexOf("Content-Length");
    int contentLengthBreak = header.indexOf("\n", contentLength);
    int startInt = header.lastIndexOf(":", contentLengthBreak);

    String length = header.substring(startInt + 1);

    return length.toInt() + 1;
}

PostData parsePostData(String header) {
    int lastBreak = header.lastIndexOf("\n");

    String postData = header.substring(lastBreak, lastBreak + getContentLength(header));

    String key = postData.substring(0, postData.indexOf("="));
    String value = postData.substring(postData.indexOf("=") + 1, postData.length());

    PostData data = {key, value.toInt()};

    return data;
}

void handleMotorStatusChange(PostData data) {
    Serial.println(data.percentage);
}

void loop() {
    WiFiClient client = server.available();
    bool isHeaderRead = false;

    if (client) {
        String header;
        String currentLine = "";
        while (client.connected()) {
            if (client.available() >= 1) {
                char c = client.read();
                header += c;
            } else if (client.available() <= 1) {
                isHeaderRead = true;
            }

            if (isHeaderRead == true) {
                if (header.indexOf("POST") >= 0) {
                    handleMotorStatusChange(parsePostData(header));
                    sendHttpResponse(client, 204);
                }
                break;
            }
        }
        client.stop();
    }
}