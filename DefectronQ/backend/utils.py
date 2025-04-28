import os
import torch
from torchvision import transforms
import numpy as np
from PIL import Image
import io
import base64
import json
from .models import Encoder, HybridGenerator, device  # Correct relative import

# ------------------------
# Preprocessing
# ------------------------
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((64, 64)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

# ------------------------
# Load Class Mappings and Thresholds with Correct Path Handling
# ------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load class_to_idx.json safely
with open(os.path.join(BASE_DIR, "class_to_idx.json"), "r") as f:
    class_to_idx = json.load(f)

# Reverse mapping: idx to class name
idx_to_class = {v: k for k, v in class_to_idx.items()}

# Load thresholds.npy safely
thresholds = np.load(os.path.join(BASE_DIR, "thresholds.npy"), allow_pickle=True).item()

# ------------------------
# Image Preprocessing Function
# ------------------------
def preprocess_image(image):
    """
    Preprocess input image for model inference.
    """
    return transform(image).unsqueeze(0).to(device)

# ------------------------
# Tensor to Base64 Conversion Function
# ------------------------
def tensor_to_base64(tensor):
    """
    Convert a PyTorch tensor (1, 64, 64) or (64, 64) to a base64-encoded PNG string.
    """
    if isinstance(tensor, torch.Tensor):
        tensor = tensor.squeeze().cpu().numpy()
    tensor = (tensor * 0.5) + 0.5  # Denormalize (assuming mean=0.5, std=0.5)
    tensor = np.clip(tensor, 0, 1)
    tensor = (tensor * 255).astype(np.uint8)

    img = Image.fromarray(tensor)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    return img_base64

# ------------------------
# Predict Anomaly Function
# ------------------------
def predict_anomaly(encoder, generator, image, class_name):
    """
    Predict whether the given image contains an anomaly.
    
    Args:
        encoder: Encoder model.
        generator: Generator model.
        image: PIL image.
        class_name: Name of the class for conditioning.

    Returns:
        score: Reconstruction error.
        threshold: Anomaly threshold for the given class.
        prediction: 1 (anomaly) or 0 (normal).
        recon_base64: Base64-encoded reconstructed image.
        anomaly_map_base64: Base64-encoded anomaly map.
    """
    if class_name not in class_to_idx:
        raise ValueError(f"Unknown class name: {class_name}")

    class_id = torch.tensor([class_to_idx[class_name]], device=device)
    image_tensor = preprocess_image(image)

    encoder.eval()
    generator.eval()

    with torch.no_grad():
        z = encoder(image_tensor)
        recon = generator(z, class_id)
        score = torch.mean((image_tensor - recon) ** 2).item()
        anomaly_map = torch.abs(image_tensor - recon)

    threshold = thresholds.get(class_to_idx[class_name], None)
    prediction = 1 if score > threshold else 0

    # Convert reconstructed image and anomaly map to base64
    recon_base64 = tensor_to_base64(recon)
    anomaly_map_base64 = tensor_to_base64(anomaly_map)

    return score, threshold, prediction, recon_base64, anomaly_map_base64
