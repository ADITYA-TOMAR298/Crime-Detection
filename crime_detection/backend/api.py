from contextlib import asynccontextmanager
import time
import cv2

from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse

from backend.pipeline import CrimeDetectionPipeline
from backend.shared import shared

pipeline = CrimeDetectionPipeline()


@asynccontextmanager
async def lifespan(app: FastAPI):
    pipeline.start()
    yield
    pipeline.stop()


app = FastAPI(
    title="Crime Detection API",
    version="2.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Crime Detection Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/status")
def status():

    with shared.lock:

        return {
            "running": shared.running,
            "camera_connected": shared.camera_connected,
            "backend_connected": True,
            "fps": shared.fps,
            "last_update": (
                shared.last_update.isoformat()
                if shared.last_update
                else None
            ),
        }

@app.get("/prediction")
def prediction():

    with shared.lock:

        return {
            "prediction": shared.latest_prediction,
            "confidence": shared.latest_confidence,
            "class_id": shared.latest_class_id,
            "fps": shared.fps,
            "processing_time": shared.processing_time,
            "last_update": (
                shared.last_update.isoformat()
                if shared.last_update
                else None
            ),
        }


def generate_frames():

    while shared.running:

        with shared.lock:

            if shared.latest_frame is None:
                frame = None
            else:
                frame = shared.latest_frame.copy()

        if frame is None:
            time.sleep(0.01)
            continue

        success, buffer = cv2.imencode(".jpg", frame)

        if not success:
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes() +
            b"\r\n"
        )


@app.get("/video_feed")
def video_feed():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )


@app.get("/snapshot")
def snapshot():

    with shared.lock:

        if shared.latest_frame is None:
            return Response(status_code=404)

        success, buffer = cv2.imencode(".jpg", shared.latest_frame)

        if not success:
            return Response(status_code=500)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg",
    )