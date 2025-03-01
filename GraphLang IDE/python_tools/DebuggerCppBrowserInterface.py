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

            if message == "end debugging":
                await websocket.close()
                
                #this doesn't seems to finish async loop
                #return  # Instead of exit(0)
                
                exit(0)

            elif (message.startswith("get random")):
                 numberStr = str(random.random())
                 print(f"sending> {numberStr}")
                 await websocket.send(numberStr)

            elif message.startswith("compile code"):
                inputFile = message.replace("compile code", "").strip()
                response = await self.compile_code(inputFile)
                await websocket.send(response)

            else:
                #this returns list
                response = self.__gdbmi.write(message)
            
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

                #
                #   sends data in chunks to not exceeds limit
                #
                await websocket.send(json.dumps(response))
                
                # NO USING this, due it's not displayed as whole on browser side since it's splitted into chunks
                #await self.safe_send(websocket, json.dumps(response))

    ##
    #   Code compile function, call another python script which perform g++ call
    #
    async def compile_code(self, inputFile):
        process = await asyncio.create_subprocess_exec(
            'python', 'compileCppCode.py', inputFile,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        
        if stdout:
            return stdout.decode()
        if stderr:
            return stderr.decode()
        return json.dumps({"status": -1, "message": "unknown error"})
    
    ##
    #   Send data to websocket to browser in chunks to not overexceed buffer size and not to close socket
    #       WARNING: I have on web browser side json parse therefore this could be problem
    #
    async def safe_send(self, websocket, data):
        CHUNK_SIZE = 4096  # Adjust as needed
        for i in range(0, len(data), CHUNK_SIZE):
            await websocket.send(data[i:i+CHUNK_SIZE])

    async def handlerAsyncLoop(self):
        async with websockets.serve(self.processBrowserMessage, self.websocketHost, self.websocketPort):
            print("websocket server started\n")
            await asyncio.Future()  # run forever

    def startAsyncLoop(self):
        asyncio.run(self.handlerAsyncLoop())

if __name__ == "__main__":
    browserInterface = DebbugerCppBrowserInterface()
    browserInterface.startAsyncLoop()
    

