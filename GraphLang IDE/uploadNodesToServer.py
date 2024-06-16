import requests
import json
import os
import time

import createWebPage as localNodesHelper

URL = 'http://localhost/GraphLangServerApp/?q=uploadNodesToServer'
NODE_OWNER = 2
NODE_PROJECT = 47
NODE_LANGUAGE = "C/C++"
NODE_ISHIDDEN = 0

if __name__ == "__main__":
    start_time = time.time()
    
    print("======== START SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")
    localNodesHelper.fillVariablesJavascriptClassHierarchy()
    print("======== END SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")

    for nodeToUpload in localNodesHelper.objectsNamesList:
        print("\n== START UPLOADING NODE")
        print(nodeToUpload)
        
        myData = {}
        myData['nodeName'] = nodeToUpload[2]
        
        nodeFilePtr = open(nodeToUpload[1], 'rb')
        NODE_CONTENT = nodeFilePtr.read()
        
        myData['nodeContent'] = NODE_CONTENT.hex()
        myData['nodeOwner'] = NODE_OWNER
        myData['projectId'] = NODE_PROJECT
        myData['nodeLanguage'] = NODE_LANGUAGE
        myData['nodeDir'] = nodeToUpload[0].replace('\\', '/')
        myData['nodeClassParent'] = nodeToUpload[3]
        myData['nodeDisplayName'] = os.path.splitext(os.path.basename(nodeToUpload[1]))[0]
        myData['nodeCategory'] = nodeToUpload[4];
        myData['nodeIsHidden'] = nodeToUpload[5];

        print(f"#REQUEST 1 - result:\n");
        x = requests.post(URL, data = myData)
        print(x.text)    

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
