import socket			

s = socket.socket()		
host = socket.gethostname()	        # Get current machine name
port = 9999			               
s.connect((host,port))
s.send(b'NI')
print(s.recv(1024))      # 1024 is bufsize or max amount 
s.close()

