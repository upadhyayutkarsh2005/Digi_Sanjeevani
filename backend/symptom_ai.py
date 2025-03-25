import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyB6WidYWiBGAVAjWzXrML8nSsj7AQ1CEWY")


def get_disease_prediction(symptoms):
    """Uses Gemini API to predict diseases based on symptoms and returns a paragraph response."""
    model = genai.GenerativeModel("gemini-2.0-flash")
    
    # New prompt to generate a paragraph instead of JSON
    prompt = f"""
    Based on the symptoms: {', '.join(symptoms)}, provide a detailed explanation of possible diseases.
    Include:
    - Disease name(s)
    - Possible causes
    - Recommended actions
    - Any additional health advice
    
    Present the response in a clear, human-readable paragraph format.
    """

    response = model.generate_content(prompt)

    return response.text.strip()  # Return clean paragraph text
