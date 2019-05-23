import json
import pymongo

# Setup connection to mongodb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# Select database and collection to use
db = client.geojson
collection = db.data

with open('new.geojson') as f:
    file_data = json.load(f)

collection.insert_one(file_data)

print("Data Uploaded!")

client.close()
