import cv2
from datetime import datetime

from backend.shared import shared


class Display:

    def __init__(self, window_name="AI Crime Detection"):

        self.window_name = window_name

        cv2.namedWindow(self.window_name, cv2.WINDOW_NORMAL)

    def show(self):

        with shared.lock:

            if shared.latest_frame is None:
                return

            frame = shared.latest_frame.copy()

            prediction = shared.latest_prediction

            confidence = shared.latest_confidence

            fps = shared.fps

        color = (
            (0, 255, 0)
            if prediction.lower() == "normal"
            else (0, 0, 255)
        )

        cv2.putText(
            frame,
            f"Status : {prediction}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.9,
            color,
            2,
        )

        cv2.putText(
            frame,
            f"Confidence : {confidence:.2%}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            color,
            2,
        )

        cv2.putText(
            frame,
            f"FPS : {fps:.1f}",
            (20, 120),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 255, 0),
            2,
        )

        current_time = datetime.now().strftime("%H:%M:%S")

        cv2.putText(
            frame,
            current_time,
            (20, frame.shape[0] - 20),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2,
        )

        cv2.imshow(self.window_name, frame)

    def should_close(self):

        key = cv2.waitKey(1) & 0xFF

        return key == ord("q")

    def destroy(self):

        cv2.destroyAllWindows()