import asyncio
import websockets

async def hello(websocket, path):
    rxData = await websocket.recv()
    print(f"< {rxData}")

    txData = f"This is response from python script on message'{rxData}'<br />\n"

    await websocket.send(txData)
    print(f"> {txData}")

    for k in range(7):
        data = f"{k}: " + txData
        await websocket.send(data)
        print(f"> {data}")

start_server = websockets.serve(hello, "localhost", 8888)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()




