"""Lightweight on-device face matching used after an anomaly is confirmed.

It deliberately uses OpenCV only, so the application does not need a cloud face
recognition service.  It is a conservative image-similarity fallback and should
be reviewed by an operator before any real-world action is taken.
"""
from pathlib import Path

import cv2
import numpy as np


class FaceMatcher:
    def __init__(self):
        cascade_path = Path(cv2.data.haarcascades) / "haarcascade_frontalface_default.xml"
        self.detector = cv2.CascadeClassifier(str(cascade_path))
        self.orb = cv2.ORB_create(nfeatures=600)
        self.matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    def _face(self, image):
        if image is None:
            return None
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = self.detector.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))
        if len(faces) == 0:
            return None
        x, y, w, h = max(faces, key=lambda item: item[2] * item[3])
        return gray[y:y + h, x:x + w]

    def match(self, frame, photo_paths):
        """Return (score, path) for the best known face, or (0, None)."""
        probe = self._face(frame)
        if probe is None:
            return 0.0, None
        _, probe_desc = self.orb.detectAndCompute(probe, None)
        if probe_desc is None:
            return 0.0, None

        best_score, best_path = 0.0, None
        for photo_path in photo_paths:
            known = self._face(cv2.imread(photo_path))
            if known is None:
                continue
            _, known_desc = self.orb.detectAndCompute(known, None)
            if known_desc is None:
                continue
            matches = self.matcher.match(probe_desc, known_desc)
            if not matches:
                continue
            good = [m for m in matches if m.distance < 55]
            score = len(good) / max(1, min(len(probe_desc), len(known_desc)))
            if score > best_score:
                best_score, best_path = score, photo_path
        return best_score, best_path


face_matcher = FaceMatcher()
