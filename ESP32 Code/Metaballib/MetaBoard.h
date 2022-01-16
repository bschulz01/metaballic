#ifndef METABOARD_h
#define METABOARD_h

#include "credentials.h"

#include "Arduino.h"
#include <SPI.h>
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Firebase_ESP_Client.h>


// CONSTS
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define LEFT_SCREEN_ADDRESS 0x3D
#define RIGHT_SCREEN_ADDRESS 0x3C

#define IR_PIN 34
#define GREEN_LED_PIN 12
#define BLUE_LED_PIN 13
#define RED_LED_PIN 14
#define BUZZER_PIN 26
#define BUZZER_CHANNEL 0
#define BUCKET_COOLDOWN_TIME 1000 // ms

enum State {idle, active};

class MetaBoard
{
    public:
        MetaBoard();
        void setLED(int r, int g, int b);
        void setBuzzer(int freq);
        void setLeftScore(int score); // value of -1 clears screen
        void setRightScore(int score); // value of -1 clears screen

				int getIR();
				double getAcceleration();
        void bucketMade();
        void shotMade();
        int getBuckets();
        int getAttempts();

				void newSession();
				void endSession();

				// loop needs to
				// read IR
				// read Acceleration
				// calc diff in IR (and update)
				// calc diff in Acceleration (and update)
				// update vars (numBuckets, numAttempts)
				
		private:
        // current state
        State currentState = idle;

				// OLED Displays
				Adafruit_SSD1306 leftDisplay;
        Adafruit_SSD1306 rightDisplay;

				// Accelerometer 
        Adafruit_MPU6050 mpu;

        // IR Variables
        int oldIRReading = 0;
        int newIRReading = 0;

        // Magnitude of Acceleration Variables
        int oldAcceleration = 0;
        int newAcceleration = 0;
        
        // Scorekeeping
        int numAttempts = 0;
        int numBuckets = 0;

        // time data
        unsigned long previousBucketTime = 0;
        unsigned long previousAttemptTime = 0;

};

#endif