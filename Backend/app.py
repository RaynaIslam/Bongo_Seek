from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Initialize the model correctly
pipe = pipeline("text-generation", model="Qwen/Qwen2.5-Math-1.5B")

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Use the correct pipeline
    result = pipe(prompt, max_length=200,trucation=True)
    return jsonify({"response": result[0]["generated_text"]})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
