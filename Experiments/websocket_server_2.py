import asyncio
import datetime
from typing import Iterator
import websockets
import random

websocket_connections = set()
sock_port = 8888
sock_url = 'localhost'
global_socket = lambda: None

async def register(websocket):
    print('register event received')
    websocket_connections.add(websocket) # Add this client's socket
    global_socket = websocket

async def poll_log():
    await asyncio.sleep(0.3) # Settle
    while True:
        await asyncio.sleep(0.3) # Slow things down

        # Send a dynamic message to the client after random delay
        r = random.randint(1, 10)
        if (r == 5): # Only send 10% of the time
            a_msg = "srv -> cli: " + str(random.randint(1,10000))
            print("sending msg: " + a_msg)
            websockets.broadcast(websocket_connections, a_msg) # Send to all connected clients

async def main():
    sock_server = websockets.serve(register, sock_url, sock_port)
    await asyncio.sleep(0.3) # Start up time
    async with sock_server: await poll_log()

if __name__ == "__main__":
    print("Websockets server starting up ...")
    asyncio.run(main())