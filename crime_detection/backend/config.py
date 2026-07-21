from pathlib import Path
import os
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

def _camera_source():
    """Return an RTSP URL or device number; unset means no camera is attached."""
    value = os.getenv("CAMERA_SOURCE", "0").strip()
    if not value or value.lower() in {"none", "disabled"}:
        return None
    return int(value) if value.isdigit() else value


CAMERA_SOURCE = _camera_source()
PIPELINE_ENABLED = os.getenv(
    "PIPELINE_ENABLED",
    "true" if CAMERA_SOURCE is not None else "false",
).lower() == "true"
DATA_DIR = Path(os.getenv("DATA_DIR", ROOT_DIR / "data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)
SNAPSHOT_DIR = DATA_DIR / "snapshots"
PHOTO_DIR = DATA_DIR / "criminal_photos"
SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
PHOTO_DIR.mkdir(parents=True, exist_ok=True)

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
