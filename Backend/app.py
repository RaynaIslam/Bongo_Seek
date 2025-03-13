from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch

app = Flask(__name__)
CORS(app)

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

if __name__ == "__main__":
    app.run(debug=True, port=8080)