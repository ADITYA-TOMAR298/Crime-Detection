import threading
from datetime import datetime


class SharedState:
    """
    Global shared runtime state.

    Every module communicates through this object.
    """

    def __init__(self):

        # -----------------------------
        # Thread Control
        # -----------------------------
        self.running = True

        self.lock = threading.Lock()

        # -----------------------------
        # Camera
        # -----------------------------
        self.camera_connected = False

        self.latest_frame = None

        # -----------------------------
        # AI Prediction
        # -----------------------------
        self.latest_prediction = "Waiting..."

        self.latest_confidence = 0.0

        self.latest_class_id = -1

        # -----------------------------
        # Performance
        # -----------------------------
        self.fps = 0.0

        self.processing_time = 0.0

        # -----------------------------
        # Event Information
        # -----------------------------
        self.last_update = None

    def update_prediction(
        self,
        prediction,
        confidence,
        class_id,
        processing_time=None,
    ):
        """
        Thread-safe prediction update.
        """

        with self.lock:

            self.latest_prediction = prediction

            self.latest_confidence = confidence

            self.latest_class_id = class_id

            if processing_time is not None:
                self.processing_time = processing_time

            self.last_update = datetime.now()

    def update_frame(self, frame):
        """
        Thread-safe frame update.
        """

        with self.lock:
            self.latest_frame = frame

    def update_fps(self, fps):
        """
        Thread-safe FPS update.
        """

        with self.lock:
            self.fps = fps


shared = SharedState()