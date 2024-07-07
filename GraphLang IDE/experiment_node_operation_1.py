import requests
import LoginClient as login
import hashlib
import re
import json
import codecs

URL = 'http://localhost/GraphLangServerApp/?q=nodeOperation'

if __name__ == "__main__":
    loginInfo, username, passwordMD5 = login.loginUsingNamePassword()
    if (loginInfo['isLogged'] == 0):
        print("user not logged, exit")
        exit(0)

    postParams = {}
    postParams['username'] = username
    token = passwordMD5
    token += loginInfo['token']
    postParams['token'] = hashlib.md5(token.encode()).hexdigest()
    postParams["operation"] = "changeNodeClassName"
    postParams["nodeClassName"] = "GraphLang.Shapes.Basic.ConstantNode"
    postParams["nodeNewClassName"] = "ModifiedClassName.SomeClass.VariableNode"
    postParams['projectId'] = 17
    #postParams["nodeId"] = 690

    response = requests.post(URL, data=postParams)
    print(response.text)
    
    responseParsed = json.loads(response.text)
    print(f"token: {responseParsed["token"]}")
    
    nodeContent = codecs.decode(responseParsed["output"]["node_content_code"], 'hex').decode('utf-8')
    #nodeContent = responseParsed["output"]["node_content_code"]
    print(f"NODE CONTENT:\n{nodeContent}")
    

