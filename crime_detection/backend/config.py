from pathlib import Path
import torch

ROOT_DIR = Path(__file__).resolve().parent.parent

MODEL_DIR = ROOT_DIR / "models"

TRANSFORMER_MODEL = MODEL_DIR / "crime_transformer_v1.pth"

I3D_MODEL = MODEL_DIR / "rgb_imagenet.pt"

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

FRAME_SIZE = 224

FEATURE_DIM = 1024

FRAME_SAMPLE_RATE = 5

MIN_SEQUENCE = 8

MAX_SEQUENCE = 32

ALERT_COOLDOWN = 30

# Class Labels
CLASS_NAMES = [
    "Normal",
    "Anomaly"
]

CAMERA_SOURCE = 0

CAMERA_WIDTH = 1280
CAMERA_HEIGHT = 720

DISPLAY_WIDTH = 1280
DISPLAY_HEIGHT = 720

QUEUE_SIZE = 64

SHOW_FPS = True
SHOW_TIMESTAMP = True
SHOW_STATUS = True
SHOW_CONFIDENCE = True

MODEL_INPUT_SIZE = 224