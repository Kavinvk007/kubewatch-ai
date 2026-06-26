import google.generativeai as genai
import os
import json

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-pro')

def analyze_log(log_text: str):
    if not GEMINI_API_KEY:
        return {
            "explanation": "This is a mocked explanation since no API key is provided.",
            "root_cause": "Mocked root cause of the error.",
            "severity": "Medium",
            "suggested_fix": "Mocked suggested fix.",
            "prevention_tip": "Mocked prevention tip."
        }
    
    prompt = f"""
    You are an expert DevOps engineer and Kubernetes administrator. Analyze the following log/error message.
    Return ONLY a JSON object with the following keys, no markdown blocks or backticks, just the raw JSON:
    "explanation": A simple explanation of what the error means.
    "root_cause": The likely root cause.
    "severity": Exactly one of: "Low", "Medium", "High".
    "suggested_fix": A step-by-step or clear suggested fix.
    "prevention_tip": How to prevent this in the future.
    
    Log to analyze:
    {log_text}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        
        return json.loads(text)
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "explanation": "Failed to analyze log.",
            "root_cause": str(e),
            "severity": "High",
            "suggested_fix": "Check Gemini API integration and quota.",
            "prevention_tip": "Ensure API key is valid and quota is available."
        }
