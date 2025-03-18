from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pymysql
import torch
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# JWT Secret Key (Change this to a strong, unique key)
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

try:
    conn = pymysql.connect(
        host="localhost", 
        user="root", 
        password="", 
        database="bongo_seek"
    )
    print("✅ MySQL Connection Successful!")
except pymysql.err.OperationalError as e:
    print(f"❌ MySQL Connection Failed: {e}")
# Function to connect to MySQL
def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="bongo_seek",
        cursorclass=pymysql.cursors.DictCursor
    )

# Load model with mixed GPU/CPU to save memory
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-Math-1.5B",
    device_map="auto",
    torch_dtype=torch.float16
)
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-Math-1.5B")
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

@app.route("/", methods=["GET"])
def home():
    return "Bongo Seek API is running!"

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "what is the capital of bangladesh")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    print(f"Prompt received: {prompt}")
    result = pipe(prompt, max_length=200, truncation=True)
    return jsonify({"response": result[0]["generated_text"]})

# Signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not (username and email and password):
        return jsonify({"error": "Missing fields"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    # Check if email or username already exists
    cursor.execute("SELECT * FROM users WHERE email=%s OR username=%s", (email, username))
    if cursor.fetchone():
        return jsonify({"error": "User already exists"}), 409

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    # Insert user into the database
    cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                   (username, email, hashed_password))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"message": "User registered successfully"}), 201

# Login route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not (email and password):
        return jsonify({"error": "Missing fields"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    # Get user details from DB
    cursor.execute("SELECT user_id, password_hash FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    user_id, hashed_password = user["user_id"], user["password_hash"]

    # Check password
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT token
    access_token = create_access_token(identity=user_id)
    return jsonify({"message": "Login successful", "token": access_token}), 200

# Protected route (only accessible with valid JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hello User {user_id}, you have access!"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)
