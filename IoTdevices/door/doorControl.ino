#include <SoftwareSerial.h>
#include <Servo.h>

Servo LOCK;

long long PrevTime;
int buzzer = 5;
bool isBeep = false;
bool isLocked = true;
char Command = 'f';

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
    LOCK.write(170);
    isLocked = !isLocked;
    delay(10000);
    LOCK.write(0);
    delay(2000); 
    isLocked = !isLocked;
    Command = 'f';
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(4,OUTPUT);
  LOCK.attach(7);
  LOCK.write(5);
  delay(500);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  //beep();
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
