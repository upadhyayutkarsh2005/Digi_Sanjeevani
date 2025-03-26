from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from mongodb import medicine_recommendations_collection

import os

# Configure Gemini API
genai.configure(api_key="AIzaSyB6WidYWiBGAVAjWzXrML8nSsj7AQ1CEWY")



router = APIRouter()

# Medicine Recommendation Model
class MedicineRequest(BaseModel):
    disease: str

# Medicine Recommendation API
@router.post("/recommend-medicine")
async def recommend_medicine(request: MedicineRequest):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"""
    Suggest commonly prescribed medicines for the following disease: {request.disease}.
    Provide details including:
    - Medicine Name
    - Purpose (What it treats)
    - Dosage (Recommended intake per day)
    - Side Effects (if any)
    Return the response in a structured paragraph format.
    """
    
    response = model.generate_content(prompt)
    
    if response and response.text:
        medicine_data = {
            "disease": request.disease,
            "recommendation": response.text.strip()
        }
        
        # Store in MongoDB
        inserted_doc = medicine_recommendations_collection.insert_one(medicine_data)
        
        medicine_data["_id"] = str(inserted_doc.inserted_id)
        return medicine_data
    else:
        raise HTTPException(status_code=500, detail="AI response generation failed")
