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

import logging
from concurrent.futures import ThreadPoolExecutor
import argparse

# Parse command line arguments
parser = argparse.ArgumentParser(description='GDB WebSocket Debugger')
parser.add_argument('--stdout', action='store_true', help='Enable stdout output')
parser.add_argument('--logging', action='store_true', help='Enable logging to log file tmp/gdb_websocket.log')
parser.add_argument('--embedded', action='store_true', help='Use platformio gdb instead of installed in OS')
parser.add_argument('--projectDir', help='Path to project, this is for embedded')
args, unknown = parser.parse_known_args()

ENABLE_STDOUT = False
ENABLE_LOGGING = False
ENABLE_EMBEDDED = False
PROJECT_DIR = ""

if args.stdout:
    ENABLE_STDOUT = True

if args.logging:
    ENABLE_LOGGING = True

if args.embedded:
    ENABLE_EMBEDDED = True

if args.projectDir:
    PROJECT_DIR = args.projectDir
    print(f"...using project dir: {PROJECT_DIR}")

if ENABLE_LOGGING:
    if not os.path.exists('tmp'):
        os.makedirs('tmp')
    logging.basicConfig(level=logging.DEBUG, filename='tmp/gdb_websocket.log')
    logger = logging.getLogger(__name__)

class DebbugerCppBrowserInterface:
    __gdbmi = None
    __websocketInterface = None
    websocketHost = "0.0.0.0"
    websocketPort = 8888
    
    def __init__(self):
        if ENABLE_EMBEDDED == False:
            self.__gdbmi = GdbController()
        else:
            #
            # platformio debugger is using this command to start and stops at beginning of mangled arduino code:
            #   > pio -d <PROJECT_DIR> debug --interface=gdb -- -x .pioinit
            #
            self.__gdbmi = GdbController(
                command=['pio', 'debug', '-d', PROJECT_DIR, '--interface=gdb', '--', '-x', '.pioinit'],
            )

        self.executor = ThreadPoolExecutor(max_workers=1)
        pass

    def _gdb_write_sync(self, message):
        """Blocking GDB write operation"""
        return self.__gdbmi.write(message)

    async def processBrowserMessage(self, websocket):
        try:
            async for message in websocket:

                print(f"received> {message}")
                logger.info(f"Received: {message[:100]}")
                response = ""

                try:
                    if message == "end debugging":

                        #for embedded there is platformio debugger running what is python process therefore it needs to be terminated this way
                        if ENABLE_EMBEDDED:
                           await websocket.send(f"GDB process terminate() was called")
                           self.__gdbmi.gdb_process.terminate()

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
                        #response = self.__gdbmi.write(message)

                        # Run blocking GDB operation in thread pool
                        logger.debug("Executing GDB command in thread...")
                        loop = asyncio.get_event_loop()
                        response = await loop.run_in_executor(
                            self.executor,
                            self._gdb_write_sync,
                            message
                        )

                        #
                        #   this is possible how to send response to browser
                        #
                        #await websocket.send(str(response))

                        #
                        #   this print using pretty print, just when this script is executed with --stdout param
                        #   this is here because this pprint cause connection close when run as service from php, probably because at that case stdout does not exists
                        #
                        if ENABLE_STDOUT:
                            pp.pprint(response)

                        #
                        #   sends data in chunks to not exceeds limit
                        #
                        await websocket.send(json.dumps(response))  #send whole answer as it is

                        # NO USING this, due it's not displayed as whole on browser side since it's splitted into chunks
                        #await self.safe_send(websocket, json.dumps(response))

                except Exception as e:
                    if ENABLE_LOGGING:
                        logger.error(f"Error processing message: {e}", exc_info=True)
                        logger.error(f"Response if used was this:\n{response}\n\n")
                    try:
                        await websocket.send(json.dumps({"error": str(e)}))
                    except:
                        if ENABLE_LOGGING:
                            logger.error("Failed to send error to client")

        except Exception as e:
            if ENABLE_LOGGING:
                logger.error(f"Fatal error in websocket handler: {e}", exc_info=True)

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
            await asyncio.sleep(0.01)  # Small delay between batches

    async def handlerAsyncLoop(self):
        async with websockets.serve(
            self.processBrowserMessage,
            self.websocketHost,
            self.websocketPort,
            max_size=10 * 1024 * 1024,   # 10MB max message size
            ping_interval=20,            # Send ping every 20 seconds
            ping_timeout=20,             # Wait 20 seconds for pong
            close_timeout=10             # Timeout for close handshake
        ):
            print("websocket server started\n")
            await asyncio.Future()  # run forever

    def startAsyncLoop(self):
        asyncio.run(self.handlerAsyncLoop())

if __name__ == "__main__":
    browserInterface = DebbugerCppBrowserInterface()
    browserInterface.startAsyncLoop()
    

