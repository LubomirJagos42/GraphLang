import requests
import hashlib
import time

URL = 'http://localhost/GraphLangServerApp/?q=userLogin'

#USERNAME = "lubomir.jagos@hidden-mail.com"
#USERPASSWORD = hashlib.md5('heslo123'.encode()).hexdigest()

def loginUsingNamePassword(USERNAME = "", PASSWORD = ""):
    try:
        USERNAME
        if (not USERPASSWORD):
            raise "";
    except:
        USERNAME = input("username (email): ")
    
    try:
        
        if (not USERPASSWORD):
            raise "";
    except:
        USERPASSWORD = input("password: ")
        USERPASSWORD = hashlib.md5(USERPASSWORD.encode()).hexdigest()

    #
    #   login - using username and password
    #
    myData = {}
    myData['username'] = USERNAME
    myData['password'] = USERPASSWORD

    x = requests.post(URL, data = myData)

    response = {}
    for variable in x.text.strip().split("&"):
        item = variable.split("=")
        response[item[0]] = item[1]

    return response, USERNAME, USERPASSWORD

def loginUsingNameToken(USERNAME = "", USERPASSWORD = "", USERTOKEN = ""):
    try:
        USERNAME
        if (not USERPASSWORD):
            raise "";
    except:
        USERNAME = input("username (email): ")
    
    try:
        USERPASSWORD
        if (not USERPASSWORD):
            raise "";
    except:
        USERPASSWORD = input("password: ")
        USERPASSWORD = hashlib.md5(USERPASSWORD.encode()).hexdigest()

    myData = {}
    myData['username'] = USERNAME
    
    token = USERPASSWORD
    token += response['token']    
    myData['token'] = hashlib.md5(token.encode()).hexdigest()

    x = requests.post(URL, data = myData)

    response = {}
    for variable in x.text.split("&"):
        item = variable.split("=")
        response[item[0]] = item[1]

    return response



if __name__ == "__main__":

    try:
        USERNAME
        if (not USERPASSWORD):
            raise "";
    except:
        USERNAME = input("username (email): ")
    
    try:
        
        if (not USERPASSWORD):
            raise "";
    except:
        USERPASSWORD = input("password: ")
        USERPASSWORD = hashlib.md5(USERPASSWORD.encode()).hexdigest()

    print()
    
    #
    #   login - using username and password
    #
    myData = {}
    myData['username'] = USERNAME
    myData['password'] = USERPASSWORD

    print(f"#REQUEST LOGIN username, password - result:");
    x = requests.post(URL, data = myData)
    print(x.text)    

    response = {}
    for variable in x.text.split("&"):
        item = variable.split("=")
        response[item[0]] = item[1]
    print(response)
    print()

    print("PRESS ENTER")
    a = input()
    print()

    #
    #   login - using username and token
    #
    myData = {}
    myData['username'] = USERNAME
    
    token = USERPASSWORD
    token += response['token']    
    myData['token'] = hashlib.md5(token.encode()).hexdigest()


    print(f"#REQUEST LOGIN username, token - result:");
    print(f"token: {token}")
    print(f"post token: {myData['token']}")

    x = requests.post(URL, data = myData)
    print()
    print(x.text)    

    response = {}
    for variable in x.text.split("&"):
        item = variable.split("=")
        response[item[0]] = item[1]
    print(response)
    print()








