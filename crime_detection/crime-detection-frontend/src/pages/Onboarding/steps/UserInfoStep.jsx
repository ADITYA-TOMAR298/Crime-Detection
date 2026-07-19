import { User, Mail, Phone } from "lucide-react";

export default function UserInfoStep({
  formData,
  setFormData,
  next,
}) {

  const handleNext = () => {

    if (formData.fullName.trim() === "") {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    next();
  };

  return (

    <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-10">

      <h2 className="text-3xl font-bold mb-2">
        Personal Information
      </h2>

      <p className="text-slate-400 mb-10">
        Tell us a little about yourself.
      </p>

      {/* Full Name */}

      <div className="mb-6">

        <label className="block mb-2 text-sm text-slate-300">
          Full Name *
        </label>

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <User className="text-slate-400 mr-3" size={20} />

          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName: e.target.value,
              })
            }
            placeholder="Enter your full name"
            className="w-full bg-transparent outline-none py-4"
          />

        </div>

      </div>

      {/* Phone */}

      <div className="mb-6">

        <label className="block mb-2 text-sm text-slate-300">
          Contact Number *
        </label>

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <Phone className="text-slate-400 mr-3" size={20} />

          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            placeholder="9876543210"
            className="w-full bg-transparent outline-none py-4"
          />

        </div>

      </div>

      {/* Email */}

      <div className="mb-10">

        <label className="block mb-2 text-sm text-slate-300">
          Google Email
        </label>

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <Mail className="text-slate-400 mr-3" size={20} />

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full bg-transparent py-4 text-slate-400"
          />

        </div>

      </div>

      <div className="flex justify-end">

        <button
          onClick={handleNext}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold transition"
        >
          Continue →
        </button>

      </div>

    </div>

  );

}