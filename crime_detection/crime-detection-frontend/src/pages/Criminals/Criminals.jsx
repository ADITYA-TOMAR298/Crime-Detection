import { useEffect, useState } from "react";
import { Save, UserRoundPlus } from "lucide-react";
import AppShell from "../../components/dashboard/AppShell";
import { addCriminal, getCriminals } from "../../services/criminalService";

const initialForm = { name: "", phone: "", address: "", past_crime: "", photos: [] };

export default function Criminals() {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadRecords = async () => {
    try { setRecords(await getCriminals()); } catch { setMessage("Unable to load criminal records."); }
  };
  useEffect(() => {
    const initialLoad = setTimeout(() => { void loadRecords(); }, 0);
    return () => clearTimeout(initialLoad);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.photos.length) { setMessage("Please add at least one photo."); return; }
    setSaving(true); setMessage("");
    const data = new FormData();
    ["name", "phone", "address", "past_crime"].forEach((key) => data.append(key, form[key]));
    form.photos.forEach((photo) => data.append("photos", photo));
    try {
      await addCriminal(data);
      setForm(initialForm);
      document.getElementById("criminal-photos").value = "";
      setMessage("Criminal information saved to the database.");
      loadRecords();
    } catch (error) {
      setMessage(error.response?.data?.detail || "Unable to save this record.");
    } finally { setSaving(false); }
  };

  return <AppShell>
    <div className="max-w-6xl">
      <div className="mb-7"><h1 className="text-3xl font-bold">Add Criminal Information</h1><p className="text-slate-400 mt-1">Create a record with one or more clear face photos for matching during a confirmed crime.</p></div>
      <form onSubmit={submit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid md:grid-cols-2 gap-5">
        <label className="font-medium">Name *<input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="mt-2 w-full rounded-xl border p-3" placeholder="Full name" /></label>
        <label className="font-medium">Phone number <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="mt-2 w-full rounded-xl border p-3" placeholder="Optional" /></label>
        <label className="font-medium">Address <input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="mt-2 w-full rounded-xl border p-3" placeholder="Optional" /></label>
        <label className="font-medium">Past crime <input value={form.past_crime} onChange={(e) => setForm({...form, past_crime: e.target.value})} className="mt-2 w-full rounded-xl border p-3" placeholder="Optional" /></label>
        <label className="md:col-span-2 font-medium">Photos *<span className="block text-sm font-normal text-slate-400 mt-1">Add one or more well-lit, front-facing photos (JPG, PNG, or WEBP).</span><input id="criminal-photos" required type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => setForm({...form, photos: Array.from(e.target.files || [])})} className="mt-3 w-full rounded-xl border p-3" /></label>
        {message && <div className="md:col-span-2 text-sm text-red-500">{message}</div>}
        <button disabled={saving} className="md:col-span-2 justify-center flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold disabled:opacity-60"><Save size={19} />{saving ? "Saving..." : "Save criminal information"}</button>
      </form>
      <section className="mt-8"><h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><UserRoundPlus /> Criminal Database</h2>
        {!records.length ? <p className="text-slate-400">No criminal records have been added yet.</p> : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{records.map((record) => <article key={record.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5"><div className="flex gap-3 overflow-hidden mb-4">{record.photos.map((photo) => <img key={photo.id} src={photo.url} alt={record.name} className="w-16 h-16 rounded-lg object-cover" />)}</div><h3 className="font-bold text-lg">{record.name}</h3>{record.phone && <p className="text-sm mt-2">Phone: {record.phone}</p>}{record.address && <p className="text-sm mt-1">Address: {record.address}</p>}{record.past_crime && <p className="text-sm mt-1">Past crime: {record.past_crime}</p>}</article>)}</div>}
      </section>
    </div>
  </AppShell>;
}
