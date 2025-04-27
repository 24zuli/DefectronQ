# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import load_models
from utils import predict_anomaly, idx_to_class
from PIL import Image

app = Flask(__name__)
CORS(app)

# ------------------------
# Load Models
# ------------------------
encoder, generator = load_models("models/encoder.pth", "models/generator.pth", num_classes=len(idx_to_class))

@app.route('/example-image')
def example_image():
    return send_from_directory('static', 'example.png')
# ------------------------
# Prediction Endpoint (Fully Updated)
# ------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files or 'class_name' not in request.form:
        return jsonify({"error": "Missing file or class_name."}), 400

    file = request.files['file']
    class_name = request.form['class_name']

    try:
        # Read and preprocess the uploaded image
        image = Image.open(file.stream).convert('RGB')

        # Call predict_anomaly (which now returns images too)
        score, threshold, prediction, recon_base64, anomaly_map_base64 = predict_anomaly(
            encoder, generator, image, class_name
        )

        # Prepare the correct response format for frontend
        return jsonify({
            "score": score,
            "threshold": threshold,
            "result": "anomaly" if prediction == 1 else "normal",   # <- changed 'prediction' to 'result'
            "reconstructed_image": recon_base64,
            "anomaly_map": anomaly_map_base64
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------------
# Run the App
# ------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
