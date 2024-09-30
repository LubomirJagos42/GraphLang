#
#    Following lines run remote debugger and waiting for telnet connection
#    To run this this needs to be installed:
#       - pip3 install websockets
#       - pip3 install pygdbmi
#
#
import asyncio
import websockets
import os
from pygdbmi.gdbcontroller import GdbController
import pprint as pp
import subprocess
import json
import random
import json

class DebbugerCppBrowserInterface:
    __gdbmi = None
    __websocketInterface = None
    websocketHost = "0.0.0.0"
    websocketPort = 8888
    
    def __init__(self):
        self.__gdbmi = GdbController()
        pass

    async def processBrowserMessage(self, websocket):
        async for message in websocket:
        
            print(f"received> {message}")

            if (message == "end debugging"):
                #
                # This ends this script.
                #
                exit(0)

            elif (message.startswith("get random")):
                 numberStr = str(random.random())
                 print(f"sending> {numberStr}")
                 await websocket.send(numberStr)

            elif (message.startswith("compile code")):
                #
                # Call script to compile CPP code.
                #
                inputFile = message.replace("compile code", "").strip()

                response = subprocess.run(['python', 'compileCppCode.py', inputFile], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                if (len(response.stdout) > 0):
                    await websocket.send(response.stdout)
                elif (len(response.stderr) > 0):
                    await websocket.send(response.stderr)
                else:
                    await websocket.send(json.dumps({"status": -1, "message": "unknown error"}))

            else:
                #this returns list
                response = self.__gdbmi.write(message);
            
                #
                #   this is possible how to send response to browser
                #
                #await websocket.send(str(response))

                #
                #   this print using pretty print
                #
                pp.pprint(response)
                #response = pp.pformat(response)
                #await websocket.send(response)

                await websocket.send(json.dumps(response))

    async def handlerAsyncLoop(self):
        async with websockets.serve(self.processBrowserMessage, self.websocketHost, self.websocketPort):
            print("websocket server started\n")
            await asyncio.Future()  # run forever

    def startAsyncLoop(self):
        asyncio.run(self.handlerAsyncLoop())

if __name__ == "__main__":
    browserInterface = DebbugerCppBrowserInterface()
    browserInterface.startAsyncLoop()
    

