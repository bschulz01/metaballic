#include "MetaBoard.h"

// TODO: wrapper for all object initializations
MetaBoard::MetaBoard()
{
    // set BAUD rate for terminal
    Serial.begin(115200);

    // setup GPIOs
    pinMode(GREEN_LED_PIN, OUTPUT);
    pinMode(BLUE_LED_PIN, OUTPUT);
    pinMode(RED_LED_PIN, OUTPUT);
    pinMode(IR_PIN, INPUT);

    // initialize sensor values
    oldIRReading = analogRead(IR_PIN);

		// initialize accel MPU
		if (!mpu.begin()) 
		{
			Serial.println("Failed to find MPU6050 chip");
			while (1) 
			{	delay(10);	}
		}
		
    // configure accelerometer for maximum sensitivity
		mpu.setAccelerometerRange(MPU6050_RANGE_2_G);
    mpu.setGyroRange(MPU6050_RANGE_250_DEG);
    mpu.setFilterBandwidth(MPU6050_BAND_260_HZ);

    // setup buzzer
    ledcSetup(BUZZER_CHANNEL, 2000, 8); // channel, freq, resolution
    ledcAttachPin(BUZZER_PIN, BUZZER_CHANNEL);

    // setup OLEDs
    leftDisplay(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
    rightDisplay(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

		// SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
		if(!leftDisplay.begin(SSD1306_SWITCHCAPVCC, LEFT_SCREEN_ADDRESS)) 
		{
			Serial.println("Left SSD1306 allocation failed");
			for(;;); // Don't proceed, loop forever
		}

		if(!rightDisplay.begin(SSD1306_SWITCHCAPVCC, RIGHT_SCREEN_ADDRESS)) 
		{
			Serial.println("Right SSD1306 allocation failed");
			for(;;); // Don't proceed, loop forever
		}

    leftDisplay.clearDisplay();
    leftDisplay.setRotation(3);
    leftDisplay.setTextSize(7);
    leftDisplay.setTextColor(SSD1306_WHITE); // Draw white text
    leftDisplay.setCursor(0, 0);     // Start at top-left corner
    leftDisplay.cp437(true);         // Use full 256 char 'Code Page 437' font
    leftDisplay.display();
    
    rightDisplay.clearDisplay();
    rightDisplay.setRotation(1);
    rightDisplay.setTextSize(7);
    rightDisplay.setTextColor(SSD1306_WHITE); // Draw white text
    rightDisplay.setCursor(0, 0);     // Start at top-left corner
    rightDisplay.cp437(true);         // Use full 256 char 'Code Page 437' font
    rightDisplay.display();

    // Initialize score for new session
    numBuckets = 0;
    numAttempts = 0;
}


// sets RGB channels of RGB LED; values range from 0 (off) to 255 (full brightness)
void Metaboard::setLED(int r, int g, int b) {
  analogWrite(RED_LED_PIN, r);
  analogWrite(GREEN_LED_PIN, g);
  analogWrite(BLUE_LED_PIN, b);
}

// sets buzzer to a certain frequency
void MetaBoard::setBuzzer(int freq)
{
  ledcWriteTone(BUZZER_CHANNEL, freq);
}

// sets number displayed on left score board
void MetaBoard::setLeftScore(int score)
{
	leftDisplay.clearDisplay();
  if(score > 0) leftDisplay.write(score);
  leftDisplay.display();
}

// sets number displayed on right score board
void MetaBoard::setRightScore(int score)
{
  rightDisplay.clearDisplay();
  if(score > 0) rightDisplay.write(score);
  rightDisplay.display();
}

// returns IR reading, updates new/old reading values 
int MetaBoard::getIR()
{
  newIRReading = analogRead(IR_PIN);
	return newIRReading;
}

// returns magnitude of x, y, and z accelerations
double MetaBoard::getAcceleration()
{
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  newAcceleration = sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.y * a.acceleration.y + a.acceleration.z * a.acceleration.z);
	if (oldAcceleration == 0.0 && previousAttemptTime == 0)
		oldAcceleration = newAcceleration;
	return newAcceleration;
}

// determines if a bucket has been made using IR readings
void MetaBoard::bucketMade()
{
  // compare IR
	double diffIR = oldIRReading - newIRReading;
	if (diffIR > 100)
	{
		if(millis() - previousBucketTime < BUCKET_COOLDOWN_TIME) {
      Serial.println("False Bucket Alarm");
		} else {
      Serial.println("Bucket Made");
      numBuckets++;
      previousBucketTime = millis();
    }
	}
	oldIRReading = newIRReading
}

// increment numAttempts if backboard hit (i.e change in acceleration)
void MetaBoard::shotMade() {
    if (newAcceleration - oldAcceleration > 1.5) {
    if (millis() - previousAttemptTime < BUCKET_COOLDOWN_TIME) {
      Serial.println("False Shot Alarm");
    } else {
      Serial.println("Shot Made");
      numAttempts++;
      previousAttemptTime = millis();
    }
  }
  oldAcceleration = newAcceleration;  
}

// return number of successful buckets (of current/last session)
int MetaBoard::getBuckets()
{
  return numBuckets;
}

// return number of attempts (of current/last session)
int MetaBoard::getAttempts()
{
  return numAttempts;
}

void MetaBoard::newSession()
{
  numBuckets = 0;
	numAttempts = 0;
}

void MetaBoard::endSession()
{
	return;
}


