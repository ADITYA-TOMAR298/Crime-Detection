import numpy as np


class FeatureBuffer:
    """
    Stores the latest temporal feature vectors.
    """

    def __init__(self, max_features=8):

        self.max_features = max_features
        self.buffer = []

    def add(self, features):
        """
        features:
            (1024,)      -> single feature
            OR
            (N,1024)     -> multiple features
        """

        features = np.asarray(features)

        # Single feature
        if features.ndim == 1:
            self.buffer.append(features)

        # Multiple features
        elif features.ndim == 2:
            for feature in features:
                self.buffer.append(feature)

        else:
            raise ValueError("Invalid feature shape")

        while len(self.buffer) > self.max_features:
            self.buffer.pop(0)

    def is_ready(self):

        return len(self.buffer) == self.max_features

    def get_sequence(self):

        return np.stack(self.buffer)

    def size(self):

        return len(self.buffer)

    def clear(self):

        self.buffer.clear()