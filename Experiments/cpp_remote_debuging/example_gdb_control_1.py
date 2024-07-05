#
#   url: https://stackoverflow.com/questions/3482869/invoke-and-control-gdb-from-python
#   installed pygdmi
#
#   url: https://cs01.github.io/pygdbmi/
#
#
from pygdbmi.gdbcontroller import GdbController
from pprint import pprint

gdbmi = GdbController()

response = gdbmi.write('file a.exe')
pprint(response)
response = gdbmi.write('l 1,20')
pprint(response)
response = gdbmi.write('b 14')
pprint(response)
response = gdbmi.write('start') #it will start program and stop at beginning of main()
pprint(response)
response = gdbmi.write('c')
pprint(response)
response = gdbmi.write('print c')
pprint(response)





