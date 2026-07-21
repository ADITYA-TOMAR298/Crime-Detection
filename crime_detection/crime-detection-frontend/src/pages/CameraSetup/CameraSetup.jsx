import { useEffect, useState } from "react";
import { Camera, CheckCircle2, Monitor, Pencil, Save } from "lucide-react";
import AppShell from "../../components/dashboard/AppShell";
import { getStatus } from "../../services/statusService";

const STORAGE_KEY = "crimeDetection.cameraConfiguration";
const emptyCctv = { cameraName: "", ip: "", port: "554", rtsp: "" };

function readSavedCamera() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export default function CameraSetup() {
  const [status, setStatus] = useState(null);
  const [savedCamera, setSavedCamera] = useState(readSavedCamera);
  const [editing, setEditing] = useState(!readSavedCamera());
  const [type, setType] = useState(readSavedCamera()?.type || "webcam");
  const [cctv, setCctv] = useState(readSavedCamera()?.cctv || emptyCctv);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadStatus = async () => setStatus(await getStatus());
    const initialLoad = setTimeout(() => { void loadStatus(); }, 0);
    const interval = setInterval(() => { void loadStatus(); }, 2000);
    return () => { clearTimeout(initialLoad); clearInterval(interval); };
  }, []);

  const startChoosing = () => {
    setType(savedCamera?.type || "webcam");
    setCctv(savedCamera?.cctv || emptyCctv);
    setMessage("");
    setEditing(true);
  };

  const saveCamera = () => {
    if (type === "cctv" && !cctv.rtsp && !cctv.ip) {
      setMessage("Enter an RTSP URL or CCTV IP address before saving.");
      return;
    }
    const configuration = { type, cctv: type === "cctv" ? cctv : null, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    setSavedCamera(configuration);
    setEditing(false);
    setMessage("");
  };

  return <AppShell>
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Camera Setup</h1>
      <p className="text-slate-400 mb-7">Choose the camera source displayed and monitored by this dashboard.</p>

      {!editing && savedCamera ? <SavedCamera configuration={savedCamera} status={status} onChoose={startChoosing} /> : <>
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <SourceCard active={type === "webcam"} icon={Monitor} title="Webcam" description="Use your computer's connected webcam." onClick={() => setType("webcam")} />
          <SourceCard active={type === "cctv"} icon={Camera} title="CCTV / RTSP" description="Connect an IP camera over your local network." onClick={() => setType("cctv")} />
        </div>
        {type === "cctv" && <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 grid md:grid-cols-2 gap-5 mb-6">
          <Field label="Camera name" value={cctv.cameraName} onChange={(value) => setCctv({ ...cctv, cameraName: value })} placeholder="Front gate camera" />
          <Field label="IP address" value={cctv.ip} onChange={(value) => setCctv({ ...cctv, ip: value })} placeholder="192.168.1.50" />
          <Field label="Port" value={cctv.port} onChange={(value) => setCctv({ ...cctv, port: value })} placeholder="554" />
          <Field label="RTSP URL" value={cctv.rtsp} onChange={(value) => setCctv({ ...cctv, rtsp: value })} placeholder="rtsp://camera-address/stream" />
          <p className="md:col-span-2 text-xs text-slate-400">For privacy, do not enter or store a CCTV password here. Configure credentials in the camera or local backend configuration.</p>
        </div>}
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <div className="flex gap-3"><button onClick={saveCamera} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"><Save size={18} />Save camera selection</button>{savedCamera && <button onClick={() => setEditing(false)} className="border border-slate-800 px-6 py-3 rounded-xl">Cancel</button>}</div>
      </>}
    </div>
  </AppShell>;
}

function SavedCamera({ configuration, status, onChoose }) {
  const isWebcam = configuration.type === "webcam";
  const cctv = configuration.cctv;
  return <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5">
    <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-slate-400">Saved camera source</p><h2 className="text-2xl font-bold flex items-center gap-2 mt-1">{isWebcam ? <Monitor className="text-red-500" /> : <Camera className="text-red-500" />}{isWebcam ? "Webcam" : (cctv?.cameraName || "CCTV / RTSP")}</h2></div><CheckCircle2 className="text-green-400" /></div>
    {!isWebcam && <div className="text-sm space-y-1"><p><span className="text-slate-400">IP address:</span> {cctv?.ip || "Provided in RTSP URL"}</p><p><span className="text-slate-400">Port:</span> {cctv?.port || "Default"}</p><p className="break-all"><span className="text-slate-400">RTSP URL:</span> {cctv?.rtsp || "Not provided"}</p></div>}
    <div className="pt-4 border-t border-slate-800 grid sm:grid-cols-3 gap-4 text-sm"><Status label="Camera" value={status?.camera_connected ? "Connected" : "Disconnected"} good={status?.camera_connected} /><Status label="Backend" value={status?.backend_connected ? "Running" : "Stopped"} good={status?.backend_connected} /><Status label="FPS" value={status?.fps ?? "--"} /></div>
    <button onClick={onChoose} className="w-full sm:w-auto border border-red-500 text-red-600 hover:bg-red-600 hover:text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><Pencil size={18} />{isWebcam ? "Choose CCTV camera" : "Change camera source"}</button>
  </div>;
}

function SourceCard({ active, icon: Icon, title, description, onClick }) {
  return <button onClick={onClick} className={`text-left rounded-2xl border p-6 ${active ? "border-red-500 bg-slate-800" : "border-slate-800 bg-slate-900 hover:border-red-400"}`}><Icon className="text-red-500 mb-4" size={38} /><h2 className="text-xl font-bold">{title}</h2><p className="text-slate-400 mt-2">{description}</p></button>;
}

function Field({ label, value, onChange, placeholder }) {
  return <label className="font-medium">{label}<input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-xl border p-3" /></label>;
}

function Status({ label, value, good }) {
  return <div><p className="text-slate-400">{label}</p><p className={good === undefined ? "font-medium" : good ? "text-green-400 font-medium" : "text-red-400 font-medium"}>{value}</p></div>;
}
