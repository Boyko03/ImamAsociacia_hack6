#include <SoftwareSerial.h>
#include <Servo.h>

Servo LOCK;
long long PrevTimeDoor = millis();
long long unlockTime = millis();
long long PrevTimeAlarm = millis();
int buzzer = 5;
int checkDoorClosed = 9;
bool isBeep = false;
bool isLocked = true;
bool isOpen = false;
bool dontlock = false;
char Command = 'f';

void beep(){
  if((millis()-PrevTimeAlarm)>=200){
    if(!isBeep){
      tone(buzzer,160);
      isBeep = !isBeep;
    }
    else{
      noTone(buzzer);
      isBeep = !isBeep;
    }
    PrevTimeAlarm = millis();
  }
}
void lock_door(){
  if(!isLocked){
    if(digitalRead(checkDoorClosed)==HIGH && !isOpen){//check if open
      isOpen = true;
      dontlock = false;
    }
    else if(digitalRead(checkDoorClosed)==LOW && isOpen){
      PrevTimeDoor=millis();
      isOpen = false;
    }
    else if(!dontlock && !isOpen && (millis()-PrevTimeDoor) >= 3500){
      LOCK.write(0);//lock door
      isLocked=true;
    }
    if(dontlock && !isOpen && (millis()-unlockTime) >= 30000){
      LOCK.write(0);//lock door
      isLocked=true;
      dontlock = false;
      unlockTime = millis();
    }
  }
}

void unlock_door(){
  if(isLocked){
    if(!isOpen){
      LOCK.write(170);
      isLocked = false;
      dontlock = true;
    }
    Command = 'f';
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(checkDoorClosed,INPUT_PULLUP);
  LOCK.attach(7);
  LOCK.write(5);
  delay(500);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  lock_door();
  if(Serial.available() > 0){
    Command = Serial.read(); 
  }
  if(Command == '0'){
    beep();
  }
  if(Command == '1'){
    noTone(buzzer);
    Command == 'f';
  }
  if(Command == '2'){
    unlock_door();
    Command == 'f';
  }
  delay(10);
  
}
