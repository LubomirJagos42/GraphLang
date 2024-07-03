#
#    Following lines run remote debugger and waiting for telnet connection
#
from remote_pdb import RemotePdb
RemotePdb('127.0.0.1', 4444).set_trace()



if __name__ == "__main__":
   varA = 10

   print("hello world")
   print("line1")
   print("line2")
   print("line3")
   print("line4")

   varB = 11

   print("line5")
   print("line6")
   print("line7")

   varC = 23


   print("line8")
   print("line9")
   print("line10")
