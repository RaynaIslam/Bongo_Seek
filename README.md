
# Bongo_Seek

Bongo_Seek is an AI-powered chatbot that utilizes the Deep Seek 1.5B model to generate intelligent, real-time responses. It assists users with natural language queries and delivers meaningful answers through a secure and modern web interface.

---

## 🚀 Features

- **AI Chatbot** using Deep Seek’s 1.5B model via Hugging Face
- **User Authentication**
  - Signup/Login with secure password hashing
  - OTP-based **2-Factor Authentication (2FA)** via email
- **JWT-based Session Management**
  - Token-based authentication
  - Session timeout handling
- **Search History** stored in a MySQL database
- **Secure API Communication** between frontend and backend

---

## 🛠 Technologies Used

### 🔧 Backend
- Python (Flask)
- Hugging Face Transformers (Deep Seek 1.5B)
- MySQL
- Flask-JWT-Extended
- Flask-Bcrypt
- PyMySQL

### 💻 Frontend
- React.js
- Tailwind CSS
- Node.js (for additional processing)

### 🔗 Third-party Integrations
- Hugging Face Transformers
- Email (SMTP) for OTP
- Two-Factor Verification

---

## 🧩 Installation & Setup

### ✅ Prerequisites
- Python 3.9+
- Node.js & npm
- MySQL Server

---

### 📦 Backend Setup

```bash
git clone https://github.com/your-repo/Bongo_Seek.git
cd Bongo_Seek/backend

# Install dependencies
pip install flask flask-mail flask-cors transformers accelerate
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

- Create MySQL database:

```sql
CREATE DATABASE bongo_seek;
```

- Run the Flask server:

```bash
flask run --port=8080
```

---

### 🌐 Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
npm install axios

# Start the React development server
npm run dev
```

---

## 📌 Usage

1. **User Signup & 2FA**
   - Visit `/signup`
   - Submit registration form
   - Verify OTP sent via email
   - Proceed to login

2. **Chatbot Interaction**
   - Enter a query in the chat interface
   - Receive AI-generated response

3. **2FA at Login**
   - Login with credentials
   - Receive and verify OTP via email

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint     | Description           |
|--------|--------------|-----------------------|
| POST   | `/signup`    | Register a new user   |
| POST   | `/login`     | Authenticate user     |
| POST   | `/Verify2FA` | Verify OTP            |
| GET    | `/protected` | Authenticated content |

### 🤖 Chatbot

| Method | Endpoint   | Description            |
|--------|------------|------------------------|
| POST   | `/api/chat`| Send prompt to chatbot |

---

## 🔒 Security Measures

- Passwords stored using Bcrypt
- JWT authentication for session management
- Email-based OTP for 2FA
- SQL injection prevention with parameterized queries

---

## 🔮 Future Improvements

- Voice interaction
- Prompt history sidebar (last 5 interactions)
- Google Authentication
- Password recovery feature
- Bengali language support
- Advanced AI model integration

---

## 📬 Contact

For queries or support:
- 📧 srishty.faiza@gmail.com  
- 📧 jeasmink9@gmail.com  
- 📧 raynaislam3002@gmail.com
