#
#    Following lines run remote debugger and waiting for telnet connection
#    To be able debug remotely python file there must be header added using remote_pdb
#       - pip3 install remote_pdb
#         or
#       - pip3 install remote-pdb
#
import asyncio
import websockets
from telnetlib import Telnet
import os
import subprocess
import time

class DebbugerBrowserInterface:
    __telnetInterface = None
    telnetHost = "localhost"
    telnetPort = 4444
    
    __websocketInterface = None
    websocketHost = "0.0.0.0"
    websocketPort = 8888
    
    def __init__(self):
        self.__telnetInterface = Telnet(self.telnetHost, self.telnetPort)

    async def processBrowserMessage(self, websocket):
        async for message in websocket:
        
            if (message == "end debugging"):
                exit(0)
        
            self.__telnetInterface.write(message.encode("utf-8") + b"\n");
            response = self.__telnetInterface.read_until(b"gogo", 0.1).decode("ascii");
            print("from browser: " + response)
            await websocket.send(response)

    async def handlerAsyncLoop(self):
        async with websockets.serve(self.processBrowserMessage, self.websocketHost, self.websocketPort):
            print("websocket server started\n")
            await asyncio.Future()  # run forever

    def startAsyncLoop(self):
        asyncio.run(self.handlerAsyncLoop())

if __name__ == "__main__":
    #currDir = pathlib.Path(__file__).parent.resolve()
    
    subprocess.Popen(['python3', 'helloWorld.py'])

    time.sleep(3)  #wait little for telnet to start in previous process

    browserInterface = DebbugerBrowserInterface()
    browserInterface.startAsyncLoop()
    

