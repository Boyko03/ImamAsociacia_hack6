import os
import numpy as numpy
import cv2
import matplotlib.pyplot as plt


def generateImage():
    os.system("./runcam.sh")

    image_raw = cv2.imread('./results/image.png', 0)

    haar_cascade_face = cv2.CascadeClassifier("/home/pi/opencv/data/haarcascades/haarcascade_frontalface_alt2.xml")

    return(image_raw, haar_cascade_face)

def convertToRGB(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

def detect_faces(scaleFactor = 1.1):
    image_result = generateImage()

    image_copy = image_result[0].copy()

    faces_rect = image_result[1].detectMultiScale(image_result[0], scaleFactor=scaleFactor, minNeighbors=5)
    
    print(faces_rect)

    for (x, y, w, h) in faces_rect:
        cv2.rectangle(image_copy, (x, y), (x+w, y+h), (0, 255, 0), 15)

    return image_copy


if __name__ == "__main__":
    detect_faces()
