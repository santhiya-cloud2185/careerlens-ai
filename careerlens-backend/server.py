from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import jwt
import datetime
import os
import google.generativeai as genai
from dotenv import load_dotenv
import fitz

load_dotenv()

app = Flask(__name__)
CORS(app)
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")

MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")

client = MongoClient(MONGO_URI)

db = client["careerlens"]

users = db["users"]


@app.route("/")
def home():
    return jsonify({"message": "CareerLens Backend Running"})


# SIGNUP
@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    existing_user = users.find_one({"email": email})

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({
        "message": "Signup successful"
    })


# LOGIN
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    if bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    ):

        token = jwt.encode(
            {
                "user_id": str(user["_id"]),
                "exp": datetime.datetime.utcnow()
                + datetime.timedelta(days=1)
            },
            JWT_SECRET,
            algorithm="HS256"
        )

        return jsonify({
            "message": "Login successful",
            "token": token,
            "name": user["name"]
        })

    return jsonify({
        "message": "Invalid password"
    }), 401

@app.route("/analyze-resume", methods=["POST"])
def analyze_resume():

    if "resume" not in request.files:
        return jsonify({
            "message": "No file uploaded"
        }), 400

    file = request.files["resume"]

    pdf = fitz.open(
        stream=file.read(),
        filetype="pdf"
    )

    text = ""

    for page in pdf:
        text += page.get_text()

    prompt = f"""
    Analyze this resume.

    Give:
    1. ATS score
    2. Missing skills
    3. Career suggestions
    4. Resume improvements

    Resume:
    {text}
    """

    print("Sending to Gemini...")

    response = model.generate_content(prompt)

    print("Gemini response received")

    return jsonify({
        "analysis": response.text
    })

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)