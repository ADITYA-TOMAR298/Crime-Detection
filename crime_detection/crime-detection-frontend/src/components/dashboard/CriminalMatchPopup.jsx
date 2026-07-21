import { useEffect, useRef, useState } from "react";
import { ShieldAlert, X } from "lucide-react";
import { getActiveCriminalMatch } from "../../services/criminalService";

export default function CriminalMatchPopup() {
  const [match, setMatch] = useState(null);
  const seenMatch = useRef(null);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getActiveCriminalMatch();
        if (data.found && data.match_id !== seenMatch.current) { seenMatch.current = data.match_id; setMatch(data); }
      } catch (error) { console.error(error); }
    };
    load(); const timer = setInterval(load, 2000); return () => clearInterval(timer);
  }, []);
  if (!match) return null;
  const criminal = match.criminal;
  return <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-5" role="alertdialog" aria-modal="true">
    <div className="relative w-full max-w-md bg-[#fffdf8] text-[#321b0d] rounded-2xl border border-red-300 shadow-2xl p-6">
      <button onClick={() => setMatch(null)} aria-label="Close alert" className="absolute right-4 top-4 p-1"><X /></button>
      <ShieldAlert className="text-red-500 mb-3" size={36} /><h2 className="text-2xl font-bold text-red-600">Criminal found in database</h2>
      <p className="mt-2">A face matched a record while an active crime was detected. Please verify this result before taking action.</p>
      <div className="mt-5 flex gap-4 items-center">{criminal.photos?.[0] && <img src={criminal.photos[0].url} alt={criminal.name} className="w-20 h-20 rounded-xl object-cover" />}<div><p className="font-bold text-lg">{criminal.name}</p>{criminal.phone && <p className="text-sm">Phone: {criminal.phone}</p>}{criminal.past_crime && <p className="text-sm">Past crime: {criminal.past_crime}</p>}<p className="text-xs text-slate-500 mt-1">Match score: {(match.confidence * 100).toFixed(0)}%</p></div></div>
      <button onClick={() => setMatch(null)} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">I have reviewed this alert</button>
    </div>
  </div>;
}
