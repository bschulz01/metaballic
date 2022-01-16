#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <SPI.h>

Adafruit_MPU6050 mpu;
const int IR_PIN = 34;
int oldReading = 0;
int newReading = 0;
int oldAcceleration = 0;
int newAcceleration = 0;
int numShots = 0;
int numBuckets = 0;

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"
#include <Preferences.h>
#include <string>

Preferences preferences;

String ssid = "Metaballin";
String password = "Bruh";

/*
String ssid;
String password;
*/


// Insert your network credentials
#define WIFI_SSID "epic masterchefs"
#define WIFI_PASSWORD "about that time"

// Insert Firebase project API Key
#define API_KEY "AIzaSyBZIg_HzbUdEcdtcxbEmGHuHOEDW4wGtD4"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://esp32-firebase-demo-a4a1c-default-rtdb.firebaseio.com/" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
unsigned long previousBucketTime = 0;
unsigned long previousShotTime = 0;
unsigned long wifiConnectBegin;
int count = 0;
bool signupOK = false;
bool wifiConnect = true;
int counter = 0;
const int SCREEN_WIDTH = 128;
const int SCREEN_HEIGHT = 32;
const int LEFT_SCREEN_ADDRESS = 0x3D;
const int RIGHT_SCREEN_ADDRESS = 0x3C;
// declare displays
Adafruit_SSD1306 leftDisplay(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
Adafruit_SSD1306 rightDisplay(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup(){
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  // set accelerometer range to +-2G
  mpu.setAccelerometerRange(MPU6050_RANGE_2_G);
  pinMode(IR_PIN, INPUT);
  oldReading = analogRead(IR_PIN);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  wifiConnectBegin = millis();
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED && millis() - wifiConnectBegin < 10000){
    Serial.print(".");
    delay(300);
  }
  if (millis() - wifiConnectBegin > 10000) {
    Serial.println();
    wifiConnect = false;
    Serial.println("Unable to connect to network");
    Serial.println("Storing data on ESP32");
  } else {
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
  }
  if(wifiConnect) {
    preferences.begin("data", false);
    ssid = preferences.getString("ssid", ""); 
    password = preferences.getString("password", "");


    if (ssid == "" || password == ""){
      Serial.println("No values saved for ssid or password");
    } else {
      Serial.println("From Flash");
      Serial.print("first value is ");
      Serial.println(ssid);
      Serial.print("Second Value is");
      Serial.println(password);
    }

  }
  if(!wifiConnect) {
    Serial.println("Offline Information Saving");
    preferences.begin("data", false);
    preferences.putString("ssid", ssid); 
    preferences.putString("password", password);
    Serial.println("Information Saved");

    preferences.end();
  }

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if(wifiConnect) {
    if (Firebase.signUp(&config, &auth, "", "")){
      Serial.println("ok");
      signupOK = true;
    }
    else{
      Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}




void loop(){
  // Checking Accelerometer to see if shot was made
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  if (counter == 0) {
    oldReading = sqrt(a.acceleration.x*a.acceleration.x + a.acceleration.y*a.acceleration.y + a.acceleration.z*a.acceleration.z);
    count++;
  }
  newReading = analogRead(IR_PIN);
  newAcceleration = sqrt(a.acceleration.x*a.acceleration.x + a.acceleration.y*a.acceleration.y + a.acceleration.z*a.acceleration.z);
  if (newAcceleration - oldAcceleration > 1.5) {
    if (millis() - previousShotTime < 1000) {
      Serial.println("False Shot Alarm");
    } else {
      Serial.println("Shot Made");
      numShots++;
      previousShotTime = millis();
    }
  }
  oldAcceleration = newAcceleration;
  // Serial.print("Acceleration Magnitude: ");
  // Serial.println(magnitudeAcceleration);
  // Serial.println(newReading - oldReading);
  //Arbitrary definition of making a shot
  if (newReading - oldReading > 100) {
    if(millis() - previousBucketTime < 1000) {
      Serial.println("False Bucket Alarm");
    } else {
      Serial.println("Bucket Made");
      numBuckets++;
      previousBucketTime = millis();
    }
  }
  oldReading = newReading;
  delay(5);
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "test/int", numShots)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;
    
    // Write an Float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 100*(numBuckets*1.0)/(numShots*1.0))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    
    // Write an bool number on the database path test/int2
    if (Firebase.RTDB.setInt(&fbdo, "test/int2", numBuckets)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
  
}
