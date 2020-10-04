import socket
import sys
import cv2
import pickle
import numpy as np
import struct
import time
import os
import threading
from aiohttp import web



HOST = '127.0.0.1'
PORT = 9999

mobile_client_request = False 


async def method(request):
    arg = request.rel_url.query['not']
    if arg == "SBI":
        global mobile_client_request
        mobile_client_request = True
    return web.Response(text="OK!", content_type="text/plain")

# because img is too big to be transmitted over one tcp packet we 
def get_image(conn):
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
    ###

    frame=pickle.loads(frame_data)
    print(frame)
    cv2.imwrite('./results/frame.png',frame)
    print('done')
    #data = b''
    #frame = ''


def open_socket_with_ImClient():
    global mobile_client_request
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((HOST, PORT))
        sock.listen(5)
        #sock.settimeout(2)
        print("Waiting for connection...")
        conn, addr = sock.accept()
        with conn:
            print('Connected by ', addr)
            while True:
                print('hi')
                message = conn.recv(1024)
                message = message[:2]
                print(message)
                
                print(mobile_client_request)
                if message == b"NI" or message[:2] == b'NI':
                    #print('NI')
                    conn.send(b"SNI")
                    #conn.close()
                    get_image(conn)

                elif message == b"RD" or message[:2] == b'RD':
                    if mobile_client_request:
                        conn.send(b"T")
                        mobile_client_request = False 
                        print(mobile_client_request)
                    else:
                        print(mobile_client_request)
                        conn.send(b"F")
                else:
                    print("i don't know what happen")


if __name__ == '__main__':
    os.system("cd results")
    os.system("python3 -m http.server 5940 &")
    os.system("cd ..")


    app = web.Application()
    app.router.add_route('GET', "/input", method)
    
    y = threading.Thread(target=open_socket_with_ImClient, args=())
    
    y.start()
    
    web.run_app(app,host='localhost', port=11111)

    #x = threading.Thread(target=app.run_app, args=(app, host='localhost', port=11111))
    #open_socket_with_ImClient()

    #x.start()
