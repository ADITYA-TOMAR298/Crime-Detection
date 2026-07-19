import cv2
from backend.config import MODEL_INPUT_SIZE


class VideoProcessor:

    def __init__(
        self,
        camera,
        sample_rate=2,
        clip_length=32,
        input_size=MODEL_INPUT_SIZE,
    ):

        self.camera = camera

        self.sample_rate = sample_rate
        self.clip_length = clip_length
        self.input_size = input_size

        self.frame_count = 0
        self.buffer = []

    def read(self):

        while True:

            frame = self.camera.get_frame()

            if frame is None:
                return None

            self.frame_count += 1

            # Keep every Nth frame
            if self.frame_count % self.sample_rate != 0:
                continue

            # Resize ONLY for the model
            model_frame = cv2.resize(
                frame,
                (self.input_size, self.input_size)
            )

            self.buffer.append(model_frame)

            if len(self.buffer) == self.clip_length:

                clip = self.buffer.copy()

                overlap = self.clip_length // 2

                self.buffer = self.buffer[-overlap:]

                return clip