import cv2
import torch
import numpy as np

from backend.config import DEVICE, FRAME_SIZE, I3D_MODEL
from third_party.i3d.pytorch_i3d import InceptionI3d


class I3DFeatureExtractor:

    def __init__(self):

        self.device = DEVICE

        self.model = InceptionI3d(
            num_classes=400,
            in_channels=3
        )

        print("Loading I3D weights...")

        weights = torch.load(
            I3D_MODEL,
            map_location=self.device
        )

        self.model.load_state_dict(weights)

        self.model.to(self.device)

        self.model.eval()

        print("I3D Loaded Successfully")

    def preprocess(self, frames):

        processed = []

        for frame in frames:

            frame = cv2.resize(frame, (FRAME_SIZE, FRAME_SIZE))

            frame = frame.astype(np.float32)

            frame /= 255.0

            processed.append(frame)

        video = np.stack(processed)

        video = torch.from_numpy(video)

        video = video.permute(3,0,1,2)

        video = video.unsqueeze(0)

        return video.to(self.device)

    @torch.no_grad()
    def extract_features(self, frames):

        video = self.preprocess(frames)
        features = self.model.extract_features(video)

        #print("Raw shape:", features.shape)

        # Remove batch and spatial dimensions
        features = features.squeeze(0).squeeze(-1).squeeze(-1)

        #print("After squeeze:", features.shape)

        # Convert (1024,T) -> (T,1024)
        features = features.permute(1, 0)

        #print("Final shape:", features.shape)

        return features.cpu().numpy()