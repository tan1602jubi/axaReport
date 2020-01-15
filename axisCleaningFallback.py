import pandas as pd

x1 = pd.ExcelFile('Axis unhandled queries.xlsx')
df = x1.parse("Sheet1")
print(df)
data = list(set(df["data"]))
c = 1
while(c > 0):
   c = 0
   for i in data:
       if(len(str(i).split(" ")) <= 2 or str(i).isalnum()):
           print(i)
           data.remove(i)
           c += 1
   print("$"*50)
df = pd.DataFrame({"data": pd.Series(data), "intent": pd.Series([])})

writer = pd.ExcelWriter("cleanedUnhandledQueries.xlsx")
df.to_excel(writer)
writer.save()
