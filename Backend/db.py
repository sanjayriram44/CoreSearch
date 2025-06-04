from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URL"))
db = client["coresearch"]
chats_col = db["chats"]
print("MongoDB connected:", client.list_database_names())
