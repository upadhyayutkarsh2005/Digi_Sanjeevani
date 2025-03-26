from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import uuid
from mongodb import appointments_collection  # Import MongoDB collection

# Configure Gemini API
genai.configure(api_key="AIzaSyB6WidYWiBGAVAjWzXrML8nSsj7AQ1CEWY") # Replace with actual key

router = APIRouter()

# Appointment Model
class Appointment(BaseModel):
    patient_name: str
    doctor_name: str
    date: str  # Format: YYYY-MM-DD
    time: str  # Format: HH:MM

# Book an Appointment (Store in MongoDB)
@router.post("/book-appointment")
async def book_appointment(appointment: Appointment):
    appointment_id = str(uuid.uuid4())  # Generate unique string ID
    jitsi_link = f"https://meet.jit.si/{appointment.patient_name.replace(' ', '_')}_{appointment_id[:8]}"
    
    appointment_data = {
        "_id": appointment_id,  # Store ID as string (to avoid ObjectId issues)
        "patient_name": appointment.patient_name,
        "doctor_name": appointment.doctor_name,
        "date": appointment.date,
        "time": appointment.time,
        "jitsi_link": jitsi_link
    }

    # Store in MongoDB
    appointments_collection.insert_one(appointment_data)
    
    return {"message": "Appointment booked successfully", "appointment": appointment_data}

# Fetch Appointments (Retrieve from MongoDB)
@router.get("/appointments")
async def get_appointments():
    all_appointments = list(appointments_collection.find({}, {"_id": 1, "patient_name": 1, "doctor_name": 1, "date": 1, "time": 1, "jitsi_link": 1}))
    
    # Convert ObjectId to string before returning
    for appointment in all_appointments:
        appointment["_id"] = str(appointment["_id"])
    
    return {"appointments": all_appointments}

# AI Medical Chatbot
class ChatInput(BaseModel):
    query: str

@router.post("/chatbot")
async def medical_chatbot(chat_input: ChatInput):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"Provide a medical response for the query: {chat_input.query}"
    
    response = model.generate_content(prompt)
    
    if response and response.text:
        return {"response": response.text.strip()}
    else:
        raise HTTPException(status_code=500, detail="AI response generation failed")
