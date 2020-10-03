import os
import cv2
import numpy as np
import socket 
import sys
import pickle
import struct
import numpy as np
from face_recognition import generateImage,convertToRGB,detect_faces
import requests
import RPi.GPIO as GPIO 

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client_socket.connect(('localhost', 9999))

GPIO.setmode(GPIO.BOARD) 
GPIO.setup(3, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

request_type = "question"

def generateContent(request_type):
    if(request_type == "image"):
        os.system("./runcam.sh")
        result = cv2.imread("./results/image.png")

    elif(request_type == "question"):
        result = b"NI"

    return result




def sendContent(request_type):
    if(request_type == "question"):
        content = generateContent(request_type)
        client_socket.send(content)

    elif(request_type == "image"):
        input_info = client_socket.recv(1024);
        if(input_info == b"SNI"):
            frame = generateContent(request_type)
            data = pickle.dumps(frame)
            client_socket.sendall(struct.pack("L", len(data)) + data)
            print(input_info)

while True:
    if GPIO.input(3) == GPIO.LOW:
        print(GPIO.input(3))
        sendContent("question")
        sendContent("image")
