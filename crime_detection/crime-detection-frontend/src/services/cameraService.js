import { API_BASE_URL } from "./api";

const cameraService = {
  videoUrl() {
    return `${API_BASE_URL}/video_feed`;
  },

  snapshotUrl() {
    return `${API_BASE_URL}/snapshot`;
  },
};

export default cameraService;
