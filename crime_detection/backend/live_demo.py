import time

from backend.pipeline import CrimeDetectionPipeline
from backend.display import Display
from backend.shared import shared

print("=" * 50)
print(" AI Crime Detection System ")
print("=" * 50)

pipeline = CrimeDetectionPipeline()

display = Display()

pipeline.start()

previous_time = time.time()

try:

    while shared.running:

        current = time.time()

        elapsed = current - previous_time

        if elapsed > 0:
            fps = 1 / elapsed
        else:
            fps = 0.0

        previous_time = current

        shared.update_fps(fps)

        display.show()

        if display.should_close():
            break

except KeyboardInterrupt:

    print("\nStopping...")

finally:

    pipeline.stop()

    display.destroy()

    print("Camera Released")