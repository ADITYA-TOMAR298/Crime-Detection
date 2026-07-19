from backend.video_processor import VideoProcessor
from backend.feature_extractor import I3DFeatureExtractor
from backend.feature_buffer import FeatureBuffer
from backend.inference import CrimeDetector

print("Initializing Camera...")
video = VideoProcessor(
    source=0,
    sample_rate=2,
    clip_length=32
)

print("Loading I3D...")
extractor = I3DFeatureExtractor()

print("Loading Transformer...")
detector = CrimeDetector()

buffer = FeatureBuffer(max_features=8)

clip_number = 0

while True:

    clip = video.read()

    clip_number += 1

    print(f"\nClip {clip_number}")

    features = extractor.extract_features(clip)

    print("Extracted Features:", features.shape)

    buffer.add(features)

    print("Buffer Size:", buffer.size())

    if not buffer.is_ready():
        continue

    sequence = buffer.get_sequence()

    print("Sequence Shape:", sequence.shape)

    result = detector.predict(sequence)

    print("\nPrediction")
    print(result)

    break

video.release()