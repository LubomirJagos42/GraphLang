import asyncio
import websockets

counter = 0

async def echo(websocket):
    global counter
    async for message in websocket:
        await websocket.send(f"{counter}: modified --> " + message)
        counter += 1

async def main():
    async with websockets.serve(echo, "localhost", 8888):
        print("websocket server started\n")
        await asyncio.Future()  # run forever

asyncio.run(main())
