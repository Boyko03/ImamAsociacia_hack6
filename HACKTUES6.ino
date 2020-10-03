#include <SoftwareSerial.h>
#include <SerialESP8266wifi.h>
#include <Servo.h>
Servo LOCK;
long long PrevTime;
int buzzer = 8;
bool isBeep = false;
bool isLocked = true;
int Comand;

void beep(){
  if((millis()-PrevTime)>=200){
    if(!isBeep){
      tone(buzzer,160);
      isBeep = !isBeep;
    }
    else{
      noTone(buzzer);
      isBeep = !isBeep;
    }
    PrevTime = millis();
  }
}

void unlock_door(){
  if(isLocked){
    LOCK.write(175);
    isLocked = !isLocked;
    delay(10000);
    LOCK.write(0);
    delay(2000); 
    isLocked = !isLocked;
  }
}

void setup() {
  LOCK.attach(9);
  LOCK.write(5);
  delay(500);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  switch(
    )
  //unlock_door();
  //beep();
  //delay(150);
      
}
