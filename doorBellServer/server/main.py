import os
import sys
import time
import socket
import pickle
import struct
import datetime
import threading

import cv2
import numpy as np
from aiohttp import web
from firebase_admin import messaging

from face_recognition import detect_faces 

firebase_token = 'emXGbjRIQGm5GJTktFtMb-:APA91bFFFhTNJXjpsPlKLRBnJtra8t1kN7eVtavwyHuyIMZ3P2vcS-63gvx-pqRvUa1p9zKjfXk0X9SQ6NeK19OFcAQml6WgW82fRfMRKy_pTI7mXf6a0LFno1jn6ul6-WVy-QH92gW2'

HOST = '127.0.0.1'
PORT = 9999

mobile_client_request = False 
send_message_flag = False 


async def method(request):
    global mobile_client_request
    global send_message_flag
    arg = request.rel_url.query['not']
    if arg == "SIB":
        mobile_client_request = True
        send_message_flag = True
    return web.Response(text="OK!", content_type="text/plain")


# because img is too big to be transmitted over one tcp packet we slice them on 4KB packets 
def get_image(conn):
    global send_message_flag

    data = b''
    payload_size = struct.calcsize("L") 
    while len(data) < payload_size:
        data += conn.recv(4096)
    packed_msg_size = data[:payload_size]
    data = data[payload_size:]
    msg_size = struct.unpack("L", packed_msg_size)[0]
    while len(data) < msg_size:
        data += conn.recv(4096)
    frame_data = data[:msg_size]
    data = data[msg_size:] 

    frame=pickle.loads(frame_data)
    print(frame)
    cv2.imwrite('./results/frame.png',frame)
    #print(send_message_flag)
    if not send_message_flag :
        if len(detect_faces()):
            message = messaging.Message(
                    data={
                        'notification': 'face_detected',
                        'time': datetime.date.today().strftime("%m/%d/%Y, %H:%M:%S"),
                    },
                    token=firebase_token,
                )
        
            response = messaging.send(message)
            print('Successfully sent message:', response)

        else:
            message = messaging.Message(
                    data={
                        'notification': 'bell_clicked',
                        'time': datetime.date.today().strftime("%m/%d/%Y, %H:%M:%S"),
                    },
                    token=firebase_token,
                )

            response = messaging.send(message)
            print('Successfully sent message:', response)
    else:
        send_message_flag = False
        

def open_socket_with_ImClient():
    global mobile_client_request

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((HOST, PORT))
        sock.listen(5)
        print("Waiting for connection...")
        conn, addr = sock.accept()
        with conn:
            print('Connected by ', addr)
            while True:
                message = conn.recv(1024)
                message = message[:2]
                
                if message == b"NI" or message[:2] == b'NI':
                    conn.send(b"SNI")
                    get_image(conn)

                elif message == b"RD" or message[:2] == b'RD':
                    if mobile_client_request:
                        conn.send(b"T")
                        mobile_client_request = False 
                    else:
                        conn.send(b"F")
                else:
                    print("i don't know what happen")


if __name__ == '__main__':
    os.system("cd results")
    os.system("python3 -m http.server 5940 &")
    os.system("cd ..")

    sock_thread = threading.Thread(target=open_socket_with_ImClient, args=())
    sock_thread.start()
    
    app = web.Application()
    app.router.add_route('GET', "/input", method)
    web.run_app(app,host='0.0.0.0', port=11111)
