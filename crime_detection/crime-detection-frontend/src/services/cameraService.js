const cameraService = {
  videoUrl() {
    return `${import.meta.env.VITE_API_URL}/video_feed`;
  },

  snapshotUrl() {
    return `${import.meta.env.VITE_API_URL}/snapshot`;
  },
};

export default cameraService;