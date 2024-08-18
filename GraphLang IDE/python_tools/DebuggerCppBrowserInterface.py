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
        
            if (message == "end debugging"):
                exit(0)

            response = self.__gdbmi.write(message);
            
            #
            #   this is possible how to send response to browser
            #
            #await websocket.send(str(response))

            #
            #   this print using pretty print
            #
            pp.pprint(response)
            response = pp.pformat(response)
            await websocket.send(response)

    async def handlerAsyncLoop(self):
        async with websockets.serve(self.processBrowserMessage, self.websocketHost, self.websocketPort):
            print("websocket server started\n")
            await asyncio.Future()  # run forever

    def startAsyncLoop(self):
        asyncio.run(self.handlerAsyncLoop())

if __name__ == "__main__":
    browserInterface = DebbugerCppBrowserInterface()
    browserInterface.startAsyncLoop()
    

