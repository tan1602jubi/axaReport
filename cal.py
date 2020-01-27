import pandas as pd
import numpy as np


def getJourney(obj):
    if "JOURNEYCODE" in list(obj.keys()) and not obj["JOURNEYCODE"] == 'nan' and not obj["JOURNEYCODE"] == 'NaN':
        return obj["JOURNEYCODE"]
    elif 'Quote Gen Rollover' in list(obj.values()) or 'rolloverpolicy' in list(obj.values()) or 'renew policy from other insurance company' in list(obj.values()):
         return 'rolloverBike'
    elif 'buy new policy' in list(obj.values()):
        print(obj.values())
        print("%"*90)
        return 'buynewBike'
    else:
        return "unknown_Journey"

def paymentPassCount(obj):
    if "PAYMENT" in list(obj.keys()) and (obj["PAYMENT"] == "success"): #obj["PAYMENT"] == "paymentDone" or 
        return 1
    elif "PAYMENT" in list(obj.keys()) and (obj["PAYMENT"] == "paymentFailed" or obj["PAYMENT"] == "failed"):
        return 0
    else:
        return 0
    
def paymentFailCount(obj):
    if "PAYMENT" in list(obj.keys()) and (obj["PAYMENT"] == "paymentFailed" or obj["PAYMENT"] == "failed"):
        return 1
    elif "PAYMENT" in list(obj.keys()) and (obj["PAYMENT"] == "paymentDone" or obj["PAYMENT"] == "success"):
        return 0
    else:
        return 0
    
def policyPassCount(obj):
    if "REVIEWFAIL" in list(obj.keys()) and obj["REVIEWFAIL"] == "false":
        return 1
    elif "REVIEWFAIL" in list(obj.keys()) and obj["REVIEWFAIL"] == "true":
        return 0
    else:
        return 0
    
def policyFailCount(obj):
    if "REVIEWFAIL" in list(obj.keys()) and obj["REVIEWFAIL"] == "true":
        return 1
    elif "REVIEWFAIL" in list(obj.keys()) and obj["REVIEWFAIL"] == "false":
        return 0
    else:
        return 0
    
def getUser(obj):
    if "SOURCE" in list(obj.keys()) and not obj["SOURCE"] == "nan" and not obj["SOURCE"] == "NaN":
        return obj["SOURCE"]
    else:
        return "Unknown_Source"

def quoteGenCount(obj):
    if not obj["QUOTENUM"] == 'nan' and not obj["QUOTENUM"] == 'NA':
        return 1
    else:
        return 0



def calculate(file):

    x = pd.ExcelFile(file)
    print(x.sheet_names, "-=--=-=-=-=-")
    df = x.parse('Data Dump')
    print(df)
    reportData = []
    for i in range(len(df)):
        record = {}
        for col in df.columns:
            record[col] = ""
            try:
                record[col] = str(df[col][i])
            except Exception as er:
                print(er, "errrrrrrrrr")
                record[col] = "---"
        reportData.append(record)        
    
    reportJson = {}
    users = {}
    agentsData = []
    
    for i in reportData:
        try:
            journey = getJourney(i)
            if journey in list(reportJson.keys()):
                reportJson[journey]["QuoteGenerated"] += quoteGenCount(i)   
                reportJson[journey]["paymentDone"] += paymentPassCount(i)
                reportJson[journey]["paymentfail"] += paymentFailCount(i)
                reportJson[journey]["policyGenerated"] += policyPassCount(i)
                reportJson[journey]["policyGeneratedFail"] += policyFailCount(i)
                users[journey].append(getUser(i))  
            elif journey == "unknown_Journey":
                continue
            else:
                reportJson[journey] = {}
                reportJson[journey]["QuoteGenerated"] = 0
                reportJson[journey]["paymentDone"] = 0
                reportJson[journey]["paymentfail"] = 0
                reportJson[journey]["policyGenerated"] = 0
                reportJson[journey]["policyGeneratedFail"] = 0
                users[journey] = []      
                reportJson[journey]["QuoteGenerated"] += quoteGenCount(i)   
                reportJson[journey]["paymentDone"] += paymentPassCount(i)
                reportJson[journey]["paymentfail"] += paymentFailCount(i)
                reportJson[journey]["policyGenerated"] += policyPassCount(i)
                reportJson[journey]["policyGeneratedFail"] += policyFailCount(i)
                users[journey].append(getUser(i))  
        except Exception as er:
            print(er, "errrorrroorr")
            pass
    print(reportJson)
    for i in users:
        users[i] = len(list(users[i])) # len(list(set(users[i])))
    print(users, "=-=-=-=-=-")
    # print(list(set(users["unknown Journey"])))    
    return reportJson, users



    