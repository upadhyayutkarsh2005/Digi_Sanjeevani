from fastapi import FastAPI, UploadFile, File
import fitz  # PyMuPDF
import google.generativeai as genai
import io
from PIL import Image
import pytesseract
from pydantic import BaseModel
from symptom_ai import get_disease_prediction
from hospital_locator import get_nearest_hospitals# Import the module correctly

# Initialize FastAPI
app = FastAPI()

# Configure Gemini API
genai.configure(api_key="")

# Extract text from PDF
def extract_text_from_pdf(pdf_bytes):
    text = ""
    pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
    for page in pdf_document:
        text += page.get_text()
    return text

# Extract text from Image (OCR)
def extract_text_from_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    text = pytesseract.image_to_string(image)
    return text

# Send extracted text to Gemini AI for structuring
def get_structured_data(extracted_text):
    prompt = f"""
    Extract and structure the following medical report into a JSON format:
    {json.dumps({
        "patient_details": {
            "name": "John Doe",
            "age": 30,
            "gender": "Male"
        },
        "test_results": [
            {
                "test_name": "Test Name",
                "observed_value": "Value",
                "unit": "Unit",
                "reference_interval": "Reference Range"
            }
        ],
        "additional_notes": "Any additional information"
    }, indent=2)}

    Ensure the response follows this exact JSON structure.
    """
    
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    
    try:
        return json.loads(response.text)  # Ensure JSON format
    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response. Ensure Gemini returns valid JSON."}

# API Endpoint to Upload and Analyze Medical Report
@app.post("/analyze/report")
async def analyze_report(file: UploadFile = File(...)):
    file_bytes = await file.read()
    
    if file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file_bytes)
    elif file.filename.endswith((".png", ".jpg", ".jpeg")):
        extracted_text = extract_text_from_image(file_bytes)
    else:
        return {"error": "Unsupported file format. Please upload a PDF or image."}

    structured_data = get_structured_data(extracted_text)

    return {"filename": file.filename, "structured_report": structured_data}

# Symptom-based AI Prediction
class SymptomInput(BaseModel):
    symptoms: list[str]

@app.post("/predict-disease")
async def predict_disease(symptoms: SymptomInput):
    prediction = get_disease_prediction(symptoms.symptoms)
    return {"input_symptoms": symptoms.symptoms, "predictions": prediction}

@app.get("/nearest-hospitals")
async def nearest_hospitals(latitude: float = Query(...), longitude: float = Query(...)):
    hospitals = get_nearest_hospitals(latitude, longitude)
    return {"nearest_hospitals": hospitals}

# Run FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
