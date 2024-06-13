import os
import mysql.connector
import time

import createWebPage as localNodesHelper

if __name__ == "__main__":
    start_time = time.time()

    cnx = None
    cursor = None
    errorList = []
    errorMsg = ""

    print("======= SCRIPT START ==========")
    
    ##
    #   Connect to mysql
    #
    try:
        cnx = mysql.connector.connect(user='root', database='graphlang_local_develop')
        cursor = cnx.cursor()
    except Exception as e:
        errorMsg = f"THERE IS ERROR during setting mysql connector: {e}"
        errorList.append(errorMsg)
        print(errorMsg)

    ##
    #   Example how ot do some simple SQL query and run it on some DB
    #
    print("======= SENDING QUERY ==========")
    try:
        query = (
            "SELECT node_display_name, node_content_code, node_owner FROM storage_schematic_blocks "
            #"WHERE internal_id = 3"
        )
        cursor.execute(query)
        print("done")
    except Exception as e:
        errorMsg = f"THERE IS ERROR during trying to do some select from mysql: {e}"
        errorList.append(errorMsg)
        print(errorMsg)

    print("======= QUERY RESULT ==========")

    if not cursor is None:
        for (node_name, node_content_code, node_owner) in cursor:
        
            #from MySQL node content is saved as BLOB -> in python it's readed as bytes
            #print(f"type of data: {type(node_content_code)}\n\n\n\n")
        
            print(node_content_code.decode("utf-8"))    #conversion to string
        
            '''
            try:
                os.makedirs("_temp")
            except FileExistsError:
                # directory already exists
                pass
            '''
        
            with open(f"_temp/{node_name}.js", "w") as outFile:
                outFile.write(node_content_code.decode("utf-8").replace("\r\n","\n"));
        
            print("----------- END RESULT ROW -------------")

        cursor.close()
        cnx.close()
    else:
        errorMsg = f"THERE WAS ERROR BEFORE, cursor used for mysql query is null, check if there was some error before during its creation."
        errorList.append(errorMsg)
        print(errorMsg)

    print("======= SCRIPT END ==========")

    ##
    #   This below will use rutines for local create webpage to scan local file and get file paths and so to get local nodes file paths and names and all info
    #   needed for update user on SQL DB.
    #
    print("======== START SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")
    localNodesHelper.fillVariablesJavascriptClassHierarchy()

    print(f"------ follows content of variable available in this script --------")
    for k in localNodesHelper.objectsNamesList:
        print(f"--> {k}")

    TABLE_SCHEMATIC_BLOCKS_NAME = "storage_schematic_blocks"
    OUTPUT_NODES_SCHEMATIC_FILE = f"{TABLE_SCHEMATIC_BLOCKS_NAME}_import.sql"
    with open(OUTPUT_NODES_SCHEMATIC_FILE, "w") as schematicNodesFile:           #file is opened in binary mode
        #NODE_LANGUAGE = "C/C++"
        #NODE_LANGUAGE = "python"
        NODE_LANGUAGE = "LabVIEW"
        
        NODE_OWNER = 2
        NODE_PROJECT = 47

        query = ""

        #this is prototype of cleaning nodes schematics which are going to be imported, NEED IMPROVEMENT, this is just developer version
        query = f"delete from {TABLE_SCHEMATIC_BLOCKS_NAME} where node_owner={NODE_OWNER};\n"
        schematicNodesFile.write(query);

        for k in localNodesHelper.objectsNamesList:
            NODE_DIRECTORY = k[0].replace('\\', '/')
            NODE_CONTENT = open(k[1], "r").read().encode().hex()
            NODE_DISPLAY_NAME = os.path.splitext(os.path.basename(k[1]))[0]
            NODE_CLASS_NAME = k[2]
            NODE_CLASS_PARENT = k[3]

            query = ""
            query += f"INSERT INTO `storage_schematic_blocks`"
            query += f"(`node_display_name`, `node_class_name`, `node_class_parent`, `node_language`, `node_directory`, `node_owner`, `node_project`, `node_content_code`) VALUES"
            query += f"('{NODE_DISPLAY_NAME}', '{NODE_CLASS_NAME}', '{NODE_CLASS_PARENT}', '{NODE_LANGUAGE}', '{NODE_DIRECTORY}', {NODE_OWNER}, {NODE_PROJECT}, UNHEX('{NODE_CONTENT}'));"
            query += f"\n"

            schematicNodesFile.write(query);
    
    print("======== END SEARCHING LOCAL FILE SYSTEM FOR NODES ==========")

    ##
    #   Print error list to have it visible at the end of script execution
    #
    print("==== ERRORS ====")
    [print(errorItem) for errorItem in errorList]

    ##
    #   Script execution duration printed.
    #
    print("--- Duration time: %s seconds ---" % (time.time() - start_time))
    