import { useState } from "react";
import {
  Monitor,
  Camera,
  Wifi,
  User,
  Lock,
  Link2,
  CheckCircle,
} from "lucide-react";

export default function CameraStep({
  formData,
  setFormData,
  back,
  finish,
}) {
  const [testing, setTesting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleTestConnection = async () => {
    setTesting(true);

    // TODO: Replace with backend API call later
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTesting(false);
    setConnected(true);
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-10">

      <h2 className="text-3xl font-bold mb-2">
        Camera Configuration
      </h2>

      <p className="text-slate-400 mb-10">
        Select the camera source that will be monitored by the AI detection
        system.
      </p>

      {/* Camera Type */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Webcam */}

        <div
          onClick={() =>
            setFormData({
              ...formData,
              cameraType: "webcam",
            })
          }
          className={`cursor-pointer rounded-2xl border p-8 transition ${
            formData.cameraType === "webcam"
              ? "border-red-500 bg-slate-800"
              : "border-slate-700 hover:border-slate-500"
          }`}
        >
          <Monitor size={48} className="text-red-500 mb-4" />

          <h3 className="text-2xl font-semibold mb-2">
            Webcam
          </h3>

          <p className="text-slate-400">
            Use your computer's connected webcam.
          </p>
        </div>

        {/* CCTV */}

        <div
          onClick={() =>
            setFormData({
              ...formData,
              cameraType: "cctv",
            })
          }
          className={`cursor-pointer rounded-2xl border p-8 transition ${
            formData.cameraType === "cctv"
              ? "border-red-500 bg-slate-800"
              : "border-slate-700 hover:border-slate-500"
          }`}
        >
          <Camera size={48} className="text-red-500 mb-4" />

          <h3 className="text-2xl font-semibold mb-2">
            CCTV / RTSP
          </h3>

          <p className="text-slate-400">
            Connect an IP Camera using RTSP.
          </p>
        </div>
      </div>

      {/* CCTV Fields */}

      {formData.cameraType === "cctv" && (
        <>

          <div className="grid md:grid-cols-2 gap-6">

            <InputField
              icon={<Camera size={18} />}
              label="Camera Name"
              value={formData.cameraName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cameraName: e.target.value,
                })
              }
            />

            <InputField
              icon={<Wifi size={18} />}
              label="IP Address"
              value={formData.ip}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ip: e.target.value,
                })
              }
            />

            <InputField
              icon={<Wifi size={18} />}
              label="Port"
              value={formData.port}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  port: e.target.value,
                })
              }
            />

            <InputField
              icon={<User size={18} />}
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

          </div>

          <div className="mt-6">

            <InputField
              icon={<Link2 size={18} />}
              label="RTSP URL"
              value={formData.rtsp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rtsp: e.target.value,
                })
              }
            />

          </div>

          <div className="mt-8 flex items-center gap-4">

            <button
              onClick={handleTestConnection}
              disabled={testing}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
            >
              {testing ? "Testing..." : "Test Connection"}
            </button>

            {connected && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={20} />
                Connection Successful
              </div>
            )}

          </div>

        </>
      )}

      {/* Buttons */}

      <div className="flex justify-between mt-12">

        <button
          onClick={back}
          className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-xl"
        >
          ← Back
        </button>

        <button
          onClick={finish}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold"
        >
          Finish Setup
        </button>

      </div>

    </div>
  );
}

function InputField({
  icon,
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>

      <div className="flex items-center bg-slate-800 rounded-xl px-4">

        <div className="text-slate-400 mr-3">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none py-4"
        />

      </div>
    </div>
  );
}