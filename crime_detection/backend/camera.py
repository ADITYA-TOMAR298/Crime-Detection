import cv2
import threading
import queue
import time

from backend.config import (
    CAMERA_SOURCE,
    CAMERA_WIDTH,
    CAMERA_HEIGHT,
    QUEUE_SIZE,
)

from backend.shared import shared


class Camera:

    def __init__(self):

        self.cap = cv2.VideoCapture(CAMERA_SOURCE)

        if not self.cap.isOpened():
            raise RuntimeError("Unable to open camera.")

        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)

        shared.camera_connected = True

        self.frame_queue = queue.Queue(maxsize=QUEUE_SIZE)

        self.thread = threading.Thread(
            target=self._capture_loop,
            daemon=True,
        )

    def start(self):

        self.thread.start()

    def _capture_loop(self):

        while shared.running:

            ret, frame = self.cap.read()

            if not ret:
                time.sleep(0.01)
                continue

            shared.update_frame(frame)

            try:
                self.frame_queue.put_nowait(frame)

            except queue.Full:

                try:
                    self.frame_queue.get_nowait()
                except queue.Empty:
                    pass

                self.frame_queue.put_nowait(frame)

    def get_frame(self):

        try:
            return self.frame_queue.get(timeout=1)

        except queue.Empty:
            return None

    def release(self):

        shared.running = False

        shared.camera_connected = False

        self.cap.release()