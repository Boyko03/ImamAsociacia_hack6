#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
const char* ssid     = "Evgeni-2.4G";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";
String Command_string;
int Command;
ESP8266WebServer server(80);
void ConvertComandandSend(){
  if(Command_string == "_____"){
    Command = 0;
  }
  else if(Command_string == "_____"){
    Command = 1;
  }
  else if(Command_string == "_____"){
    Command = 2;
  }
  Serial.write(Command); 
}
void handleCommands(){
  if(!server.arg("command")){
    server.send(400, "text/plain", "400: Invalid Request");
    return;
  }
  else{
    Command_string = server.arg("command");
    server.send(200, "text/plain", "Comand Accepted");
  }
  ConvertComandandSend();
  
}
String header;
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.println("Conected");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());
  server.on("/", HTTP_GET, handleCommands);
  server.begin();
}

void loop() {
  server.handleClient();
}
