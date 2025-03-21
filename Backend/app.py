from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pymysql
import torch
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change if using another service
app.config['MAIL_PORT'] = 587  # Use 465 for SSL, 587 for TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'srishty.faiza@gmail.com'
app.config['MAIL_PASSWORD'] = 'qxmn leuu tsbe cxec '
app.config['MAIL_DEFAULT_SENDER'] = 'srishty.faiza@gmail.com'


def send_verification_email(email, code):
    sender_email = app.config['MAIL_USERNAME']
    sender_password = app.config['MAIL_PASSWORD']
    
    subject = "Your 2FA Verification Code"
    body = f"Your verification code is: {code}"

    # Create MIME message
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        # Connect to SMTP server
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()  # Secure the connection
        server.ehlo()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, email, msg.as_string())
        server.quit()
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Error sending email: {e}")

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
    device_map="cpu",
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
    
    # Extract only the response (remove prompt from output)
    generated_text = result[0]["generated_text"]
    response_text = generated_text[len(prompt):].strip()  # Remove the prompt from the output

    return jsonify({"response": response_text})

@app.route('/api/chat', methods=['POST'])
@jwt_required()
def chat():
    data = request.json
    user_prompt = data.get('prompt')

    if not user_prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    user_id = get_jwt_identity()

    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Check if the user has an active chat session
        cursor.execute("""
            SELECT session_id FROM chat_sessions 
            WHERE user_id = %s ORDER BY created_at DESC LIMIT 1
        """, (user_id,))
        session = cursor.fetchone()

        if session:
            session_id = session['session_id']
        else:
            # If no session exists, create a new one
            cursor.execute("""
                INSERT INTO chat_sessions (user_id) VALUES (%s)
            """, (user_id,))
            db.commit()
            session_id = cursor.lastrowid  # Get the newly created session ID

        # Generate AI response
        response = pipe(user_prompt, max_length=200, truncation=True)
        generated_text = response[0]["generated_text"]
        
        # Remove the original prompt from the response
        response_text = generated_text[len(user_prompt):].strip()

        # Save to search_history and link it to the session
        cursor.execute("""
            INSERT INTO search_history (user_id, query, response, status, parent_id) 
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, user_prompt, response_text, 'completed', session_id))
        db.commit()

        cursor.close()
        db.close()

    except pymysql.MySQLError as e:
        print(f"❌ Database Error: {e}")
        return jsonify({"error": "Database operation failed"}), 500
    except Exception as e:
        print(f"❌ AI Model Error: {e}")
        return jsonify({"error": "AI Model failed"}), 500

    return jsonify({"response": response_text, "session_id": session_id})


@app.route("/Verify2FA", methods=["POST"])
def verify_2fa():
    data = request.json
    email = data.get("email")
    code = data.get("code")

    if not (email and code):
        return jsonify({"error": "Missing fields"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT user_id FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_id = user["user_id"]

    cursor.execute("SELECT * FROM two_factor_auth WHERE user_id = %s AND verification_code = %s", (user_id, code))
    record = cursor.fetchone()

    if not record:
        return jsonify({"error": "Invalid or expired verification code"}), 400

    # Mark the 2FA as verified
    cursor.execute("UPDATE two_factor_auth SET verified = 1 WHERE user_id = %s", (user_id,))
    db.commit()

    # Generate JWT token after OTP verification
    access_token = create_access_token(identity=str(user_id))

    cursor.close()
    db.close()

    return jsonify({"message": "2FA verified successfully.", "token": access_token}), 200

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

    cursor.execute("SELECT * FROM users WHERE email=%s OR username=%s", (email, username))
    if cursor.fetchone():
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                   (username, email, hashed_password))
    db.commit()
    
    user_id = cursor.lastrowid

    # Generate and store verification code
    verification_code = str(random.randint(100000, 999999))
    cursor.execute(
        "INSERT INTO two_factor_auth (user_id, verification_code, expires_at, verified) VALUES (%s, %s, NOW() + INTERVAL 10 MINUTE, 0)",
        (user_id, verification_code)
    )
    db.commit()

    send_verification_email(email, verification_code)

    cursor.close()
    db.close()

    return jsonify({"message": "User registered successfully. Please verify your email."}), 201
# Login route
from datetime import datetime, timedelta
import secrets

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not (email and password):
        return jsonify({"error": "Missing fields"}), 400

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT user_id, password_hash FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    user_id, hashed_password = user["user_id"], user["password_hash"]

    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Check 2FA verification status
    cursor.execute("SELECT verified FROM two_factor_auth WHERE user_id = %s", (user_id,))
    two_fa_status = cursor.fetchone()

    if two_fa_status and two_fa_status["verified"] == 0:
        return jsonify({"error": "Please verify your email before logging in."}), 403

    access_token = create_access_token(identity=str(user_id))

    session_token = secrets.token_hex(32)
    expires_at = datetime.utcnow() + timedelta(days=1)

    cursor.execute(
        "INSERT INTO sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s) "
        "ON DUPLICATE KEY UPDATE session_token = VALUES(session_token), expires_at = VALUES(expires_at)",
        (user_id, session_token, expires_at)
    )
    db.commit()

    cursor.close()
    db.close()

    return jsonify({"message": "Login successful", "token": access_token, "session_token": session_token}), 200

# Protected route (only accessible with valid JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hello User {user_id}, you have access!"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)
