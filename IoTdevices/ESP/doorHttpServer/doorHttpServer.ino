#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "SoftwareSerial.h"

const char* ssid ="ssdi";
const char* password = "password";
String Command_string;
//char Command;
int prevTime = millis();
ESP8266WebServer server(80);
//IPAddress local_IP(192, 168, 1, 184);
//IPAddress gateway(192, 168, 1, 1);
//IPAddress subnet(255, 255, 0, 0);

//Stream* logger;

void handleNotFound(){
  server.send(404, "text/plain", "404: Not found"); // Send HTTP status 404 (Not Found) when there's no handler for the URI in the request
}

void ConvertComandandSend(){
  if(Command_string == "alarmOn"){
    Serial.write('0');
  }
  else if(Command_string == "alarmOff"){
    Serial.write('1');
  }
  else if(Command_string == "unlock"){
    Serial.write('2');
  }
  //Serial.write(Command); 
}

void handleCommands(){
  if(!server.arg("command")){
    server.send(400, "text/plain", "400: Invalid Request");
//    return;
  }
  else{
    Command_string = server.arg("command");
    server.send(200, "text/plain", "Comand Accepted");
    ConvertComandandSend();
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
  }
  
  server.on("/input", HTTP_GET, handleCommands);
  server.onNotFound(handleNotFound);
  server.begin();
  //Serial.write('0');
  delay(1000);
  //Serial.write('1');
  
}

void loop() {
  server.handleClient();
}
