#include "MetaBoard.h"

MetaBoard meta;

// TODO: Persistent Memory on ESP32
#include <Preferences.h>
Preferences preferences;

// FIREBASE
// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"
#include <string>
String ssid = "Metaballin";
String password = "Bruh";
/*
String ssid;
String password;
*/
// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://esp32-firebase-demo-a4a1c-default-rtdb.firebaseio.com/" 
//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long wifiConnectBegin;
unsigned long sendDataPrevMillis = 0;
int count = 0; 
bool signupOK = false;
bool wifiConnect = true;

void setup(){
	meta = MetaBoard();
	// Authenticating network
  // Replace with personal network credentials
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  // Connecting to internet, if not possible in 10 seconds store data in flash memory
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
  // Determining if Data exists on flash memory
  if(wifiConnect) {
    preferences.begin("data", false);
    ssid = preferences.getString("ssid", ""); 
    password = preferences.getString("password", "");
    // No values in flash memory
    if (ssid == "" || password == ""){
      Serial.println("No values saved for ssid or password");
    } else { // printing data stored in flash
      Serial.println("From Flash");
      Serial.print("first value is ");
      Serial.println(ssid);
      Serial.print("Second Value is");
      Serial.println(password);
      // TODO: Append data to database
    }
  }
  // Saving data to flash memory because no internet connection found
  if(!wifiConnect) {
    Serial.println("Offline Information Saving");
    preferences.begin("data", false);
    preferences.putString("ssid", ssid); 
    preferences.putString("password", password);
    Serial.println("Information Saved");
    preferences.end();
  }

  // Assign the api key 
  config.api_key = API_KEY;
  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;
  // Sign up, if we could connect to WiFi
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
	meta.checkSession();
  meta.getIR();
	meta.getAcceleration();
	meta.bucketMade();
	meta.shotMade();
  delay(5);
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "test/int", meta.getAttempts())){
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
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 100*(meta.getBuckets()*1.0)/(meta.getAttempts()*1.0))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    
    // Write an bool number on the database path test/int2
    if (Firebase.RTDB.setInt(&fbdo, "test/int2", meta.getBuckets())){
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
