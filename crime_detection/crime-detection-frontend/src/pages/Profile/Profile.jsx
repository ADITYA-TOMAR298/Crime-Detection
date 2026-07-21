import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import userService from "../../services/userService";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;
    userService.getProfile(user.uid)
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, [user?.uid]);

  const details = [
    ["Authentication", "Google OAuth"],
    ["Role", "Administrator"],
    ["Contact number", profile?.phone || "Not provided"],
    ["Emergency phone", profile?.emergency_phone || "Not provided"],
    ["Emergency email", profile?.emergency_email || "Not provided"],
    ["Member since", profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Loading..."],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 max-w-xl">
        <img src={user?.photo} alt="Profile" className="w-28 h-28 rounded-full mb-6" />
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-slate-400">{user?.email}</p>
        <div className="mt-8">
          {details.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 border-b border-slate-800 py-3">
              <span>{label}</span>
              <span className="text-right text-slate-400">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
