# author: LuboJ
# date: September 2024
# description: This script will compile C++ code using gcc
#

import sys
import subprocess
import json

if __name__ == "__main__":
    scriptOutput = {}

    #print("CPP code compile start")

    #########################################################################################################################################
    # STEP 1 - check if g++ compiler is available on system
    #########################################################################################################################################

    #print("Trying to detect gcc availability")

    isCompilerAvailable = False
    cmdOutput = ""
    #print()
    try:
        cmdOutput = subprocess.check_output(["g++", "-v"], stderr=subprocess.STDOUT, text=True)
    except:
        pass

    #print()
    #print("============ start cmd output ===================")
    #print(cmdOutput)
    #print("============ end cmd output ===================")
    #print()

    isCompilerAvailable = cmdOutput.find("gcc version") > -1                           #seems strange but g++ version has really line gcc version there
    #print(f"searching gcc version string result: {isCompilerAvailable}")

    if (isCompilerAvailable):
        #print("Compiler available")
        pass
    else:
        #print("Cannot find compiler")

        scriptOutput['status'] = -1
        scriptOutput['message'] = "Cannot find compiler"
        print(json.dumps(scriptOutput))

        exit(-1)

    #########################################################################################################################################
    # STEP 2 - check if needed input parameters are available, for now just input file which to be compiled
    #########################################################################################################################################

    #print("Checking input parameters")

    inputFile = None
    outputFile = None
    try:
        inputFile = sys.argv[1]
        outputFile = sys.argv[2]
    except:
        pass

    if (inputFile):
        #print(f"Going to compile file '{inputFile}'")
        pass
    else:
        #print("No input file provided")

        scriptOutput['status'] = -1
        scriptOutput['message'] = "No input file provided"
        print(json.dumps(scriptOutput))

        exit(-1)

    #########################################################################################################################################
    # STEP 3 - compile file
    #        - g++ flags:
    #              -fdiagnostics-format=json - output of command is in json
    #              -g - compile with debug information, this is needed for gdb
    #########################################################################################################################################

    #print("Start compile file")

    cmdOutput = ""
    #print()
    try:
        if (outputFile):
             cmdOutput = subprocess.run(['g++', '-fdiagnostics-format=json', '-g', '-o', outputFile, inputFile], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        else:
             cmdOutput = subprocess.run(['g++', '-fdiagnostics-format=json', '-g', inputFile], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    except:
        pass

    #print()
    #print("============ start cmd stderr output ===================")
    #print(cmdOutput.stderr)
    #print("============ end cmd stderr output ===================")
    #print("============ start cmd stdout output ===================")
    #print(cmdOutput.stdout)
    #print("============ end cmd stdout output ===================")
    #print()
    #print(f"output code: {cmdOutput.returncode}")

    if (cmdOutput.returncode == 0):
        #print("Compilation sucessful")
        pass
    else:
        #print("Compilation error")
        scriptOutput['status'] = -1
        scriptOutput['message'] = f""
        scriptOutput['errorMsg'] = cmdOutput.stderr
        print(json.dumps(scriptOutput))

        exit(-1)

    scriptOutput['status'] = 0
    scriptOutput['errorMsg'] = ""
    scriptOutput['message'] = f"Compilation sucessful\n{cmdOutput.stdout}"
    print(json.dumps(scriptOutput))


