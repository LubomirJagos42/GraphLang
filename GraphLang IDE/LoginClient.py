import requests
import hashlib
import time
import argparse

URL = 'http://localhost/GraphLangServerApp/?q=userLogin'

USERNAME = ""
USERPASSWORD = ""

def parseNamePasswordFromArguments():
    USERNAME = ""
    USERPASSWORD = ""

    parser = argparse.ArgumentParser(
        description='GraphLang LoginClient argument parser'
    )
    parser.add_argument('--user', type=str, help='Username')
    parser.add_argument('--password', type=str, help='Password')

    # Parse
    args, unknown = parser.parse_known_args()
    print(args)
    if args.user:
        USERNAME = args.user
    if args.password:
        USERPASSWORD = hashlib.md5(args.password.encode()).hexdigest()

    return USERNAME, USERPASSWORD

def loginUsingNamePassword(USERNAME = "", PASSWORD = ""):

    USERNAME, USERPASSWORD = parseNamePasswordFromArguments()

    if USERNAME == "":
        USERNAME = input("username (email): ")
    
    if USERPASSWORD == "":
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

    USERNAME, USERPASSWORD = parseNamePasswordFromArguments()

    if USERNAME == "":
        USERNAME = input("username (email): ")

    if USERPASSWORD == "":
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

    USERNAME, USERPASSWORD = parseNamePasswordFromArguments()

    if USERNAME == "":
        USERNAME = input("username (email): ")

    if USERPASSWORD == "":
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








