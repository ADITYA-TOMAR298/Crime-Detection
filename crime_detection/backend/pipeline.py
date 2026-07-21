import threading
import time

from backend.video_processor import VideoProcessor
from backend.feature_extractor import I3DFeatureExtractor
from backend.feature_buffer import FeatureBuffer
from backend.inference import detector
from backend.camera import Camera
from backend.shared import shared
from backend.logger import logger
from backend.incident_manager import incident_manager
from backend.config import PIPELINE_ENABLED


class CrimeDetectionPipeline:

    def __init__(self,
                 sample_rate=2,
                 clip_length=32,
                 max_features=8):

        self.camera = Camera()

        self.video = VideoProcessor(
            camera=self.camera,
            sample_rate=sample_rate,
            clip_length=clip_length,
        )

        self.extractor = I3DFeatureExtractor()

        self.buffer = FeatureBuffer(max_features)

        self.detector = detector

        self.thread = None

        self.started = False

    def start(self):

        if self.started:
            return

        if not PIPELINE_ENABLED:
            logger.info("Crime detection pipeline is disabled (set PIPELINE_ENABLED=true and CAMERA_SOURCE to enable it)")
            return

        shared.running = True

        self.camera.start()

        self.thread = threading.Thread(
            target=self._inference_loop,
            daemon=True,
        )

        self.thread.start()

        self.started = True

        logger.info("Crime Detection Pipeline Started")

    def stop(self):

        if not self.started:
            return

        shared.running = False

        self.camera.release()

        if self.thread and self.thread.is_alive():
            self.thread.join(timeout=3)

        self.started = False

        logger.info("Pipeline Stopped")

    def _inference_loop(self):

        while shared.running:

            try:

                clip = self.video.read()

                if clip is None:
                    continue

                start = time.perf_counter()

                features = self.extractor.extract_features(clip)

                self.buffer.add(features)

                if not self.buffer.is_ready():
                    continue

                sequence = self.buffer.get_sequence()

                result = self.detector.predict(sequence)

                processing = time.perf_counter() - start

                shared.update_prediction(
                    prediction=result["prediction"],
                    confidence=result["confidence"],
                    class_id=result["class_id"],
                    processing_time=processing,
                )
                incident_manager.process_prediction(
                    prediction=result["prediction"],
                    confidence=result["confidence"]
                )

            except Exception:

                logger.exception("Inference pipeline crashed")

                time.sleep(0.1)
