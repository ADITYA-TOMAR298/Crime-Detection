import numpy as np
import torch

from backend.model import CrimeTransformer
from backend.config import (
    TRANSFORMER_MODEL,
    DEVICE,
    CLASS_NAMES
)


class CrimeDetector:

    def __init__(self):

        self.model = CrimeTransformer()

        checkpoint = torch.load(
            TRANSFORMER_MODEL,
            map_location=DEVICE
        )

        self.model.load_state_dict(checkpoint)

        self.model.to(DEVICE)
        self.model.eval()

        print(f"✅ Transformer Loaded ({DEVICE})")

    @torch.no_grad()
    def predict(self, sequence):

        if isinstance(sequence, np.ndarray):
            sequence = torch.from_numpy(sequence).float()

        if sequence.ndim == 2:
            sequence = sequence.unsqueeze(0)

        sequence = sequence.to(DEVICE)

        logits = self.model(sequence)

        probs = torch.softmax(logits, dim=1)

        confidence, pred = torch.max(probs, dim=1)

        return {
            "prediction": CLASS_NAMES[pred.item()],
            "class_id": pred.item(),
            "confidence": round(confidence.item(), 4)
        }


# Singleton instance
detector = CrimeDetector()