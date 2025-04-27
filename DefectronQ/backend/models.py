# backend/models.py
import torch
import torch.nn as nn
import torch.nn.functional as F
import pennylane as qml

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class Encoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 64, 4, 2, 1)
        self.conv2 = nn.Conv2d(64, 128, 4, 2, 1)
        self.dropout = nn.Dropout(0.3)
        self.fc = nn.Linear(128 * 16 * 16, 4)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = self.dropout(x)
        x = x.view(x.size(0), -1)
        return self.fc(x)

n_qubits = 4
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev, interface="torch")
def quantum_circuit(inputs, weights):
    qml.templates.AngleEmbedding(inputs, wires=range(n_qubits))
    qml.templates.StronglyEntanglingLayers(weights, wires=range(n_qubits))
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

class HybridGenerator(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.class_embedding = nn.Embedding(num_classes, 4)
        self.pre_fc = nn.Sequential(
            nn.Linear(8, 128), nn.ReLU(),
            nn.Linear(128, n_qubits)
        )
        self.q_layer = qml.qnn.TorchLayer(quantum_circuit, {"weights": (3, n_qubits, 3)})
        self.post_fc = nn.Sequential(
            nn.Linear(n_qubits, 512), nn.ReLU(),
            nn.Linear(512, 64 * 64), nn.Tanh()
        )

    def forward(self, x, class_id):
        class_embed = self.class_embedding(class_id)
        x = torch.cat([x, class_embed], dim=1)
        x = self.pre_fc(x)
        x = self.q_layer(x)
        x = self.post_fc(x)
        return x.view(-1, 1, 64, 64)

def load_models(encoder_path, generator_path, num_classes):
    encoder = Encoder().to(device)
    generator = HybridGenerator(num_classes).to(device)
    encoder.load_state_dict(torch.load(encoder_path, map_location=device))
    generator.load_state_dict(torch.load(generator_path, map_location=device))
    encoder.eval()
    generator.eval()
    return encoder, generator
