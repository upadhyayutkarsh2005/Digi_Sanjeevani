from pymongo import MongoClient

# MongoDB Connection URI (Replace with your MongoDB URI)
MONGO_URI = "mongodb+srv://Utkarsh1234:Jaihind123456@fastapilearn.j7yqi.mongodb.net/"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["DigiSanjeevani"]  # Database Name

# Collections
appointments_collection = db["appointments"]
medical_records_collection = db["medical_records"]
medicine_recommendations_collection = db["medicine_recommendations"]
