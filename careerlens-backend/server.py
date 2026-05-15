from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pypdf import PdfReader
from google import genai
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "CareerLens AI Backend Running 🚀"

@app.route("/analyze-resume", methods=["POST"])
def analyze_resume():

    file = request.files["resume"]

    reader = PdfReader(file)

    text = ""

    for page in reader.pages:
        text += page.extract_text()

    prompt = f"""
Analyze this resume professionally.

Give output in proper markdown format.

Include:

# ATS Score

# Skills Found

# Missing Skills

# Career Suggestions

# Resume Improvements

Resume:
{text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return jsonify({
        "analysis": response.text
    })

if __name__ == "__main__":
    app.run(debug=True)