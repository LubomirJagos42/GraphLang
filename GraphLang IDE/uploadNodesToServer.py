import requests
import json
import os
import time
import math
import LoginClient as login
import hashlib
import re
import argparse

import createWebPage as localNodesHelper

URL = 'http://localhost/GraphLangServerApp/?q=uploadNodesToServer'

NODE_LANGUAGE = "C/C++"
NODE_ISHIDDEN = 0

if __name__ == "__main__":
    loginInfo, username, passwordMD5 = login.loginUsingNamePassword()
    usertoken = loginInfo['token']

    if (loginInfo['isLogged'] == 0):
        print("user not logged, exit")
        exit(0)

    parser = argparse.ArgumentParser(
        description='GraphLang uploadNodesToServer argument parser'
    )
    parser.add_argument('--projectId', type=int, help='Project ID')

    # Parse
    args, unknown = parser.parse_known_args()
    print(args)
    NODE_PROJECT = -1
    if args.projectId:
        NODE_PROJECT = args.projectId
    else:
        NODE_PROJECT = input("project id: ")

    NODE_PROJECT = abs(int(NODE_PROJECT))
    print(NODE_PROJECT)
    
    start_time = time.time()
    
    print("======== START SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")
    localNodesHelper.fillVariablesJavascriptClassHierarchy()
    print("======== END SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")

    for nodeToUpload in localNodesHelper.objectsNamesList:
        print("\n== START UPLOADING NODE")
        print(nodeToUpload)
        
        myData = {}
        
        myData['username'] = username
        token = passwordMD5
        token += usertoken
        myData['token'] = hashlib.md5(token.encode()).hexdigest()
    
        myData['nodeName'] = nodeToUpload[2]
        
        nodeFilePtr = open(nodeToUpload[1], 'rb')
        NODE_CONTENT = nodeFilePtr.read()   
        myData['nodeContent'] = NODE_CONTENT.hex()
        
        myData['projectId'] = NODE_PROJECT
        myData['nodeLanguage'] = NODE_LANGUAGE
        myData['nodeDir'] = nodeToUpload[0].replace('\\', '/')
        myData['nodeClassParent'] = nodeToUpload[3]
        myData['nodeDisplayName'] = os.path.splitext(os.path.basename(nodeToUpload[1]))[0]
        myData['nodeCategory'] = nodeToUpload[4];
        myData['nodeIsHidden'] = 1 if nodeToUpload[5] else 0;    #conver True/False to 1/0 because this is going into SQL DB and without this it wasn't handled on PHP side correctly

        #
        # for debugging, there is long output due there is whole class code printed into command line
        #
        #print(f"#REQUEST 1 - data:\n");
        #print(myData)

        print(f"#REQUEST 1 - result:\n");
        x = requests.post(URL, data = myData)
        print(x.text)
        
        #
        # get new token from response
        #
        result = re.search(r"token:'([a-zA-Z0-9]+)'", x.text)
        usertoken = result.group(1)
        print(f"token found: {usertoken}")

    #
    #   DIFFERENT METHOD POST DATA - using json - In progress... not running now
    #
    '''
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    myJson = {
        "nodeName": "GraphLang.LibraryBlocks.experimentNameA",
        "nodeContent": "...lorem ipsum..."
    }
    print(f"#REQUEST 2 - payload: {myJson}\n");
    x = requests.post(URL, json = myJson, headers = headers)
    print(x.text)    
    '''

    print("--- %s seconds ---" % (time.time() - start_time))
