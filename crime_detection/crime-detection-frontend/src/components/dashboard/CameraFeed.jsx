import { useState } from "react";
import cameraService from "../../services/cameraService";

export default function CameraFeed() {
  const [error, setError] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold">Live Surveillance</h2>
          <p className="text-slate-400">AI Monitoring</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          LIVE
        </div>
      </div>

      {error ? (
        <div className="aspect-video flex items-center justify-center text-red-400">
          Camera stream unavailable
        </div>
      ) : (
        <img
          src={cameraService.videoUrl()}
          alt="Live Camera Feed"
          className="w-full aspect-video object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}