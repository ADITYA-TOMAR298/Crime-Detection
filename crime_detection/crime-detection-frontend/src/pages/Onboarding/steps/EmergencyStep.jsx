import { Phone, Mail, Info } from "lucide-react";

export default function EmergencyStep({
  formData,
  setFormData,
  next,
  back,
}) {

  return (

    <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-10">

      <h2 className="text-3xl font-bold mb-2">
        Emergency Contact
      </h2>

      <p className="text-slate-400 mb-8">
        These details are optional. If provided, alerts will also be sent
        to these contacts whenever suspicious activity is detected.
      </p>

      {/* Phone */}

      <div className="mb-6">

        <label className="block mb-2 text-sm text-slate-300">

          Emergency Contact Number

          <span className="text-green-400 ml-2">
            (Optional)
          </span>

        </label>

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <Phone
            className="text-slate-400 mr-3"
            size={20}
          />

          <input
            type="tel"
            placeholder="9876543210"
            value={formData.emergencyPhone}
            onChange={(e) =>
              setFormData({
                ...formData,
                emergencyPhone: e.target.value,
              })
            }
            className="w-full bg-transparent outline-none py-4"
          />

        </div>

      </div>

      {/* Email */}

      <div className="mb-8">

        <label className="block mb-2 text-sm text-slate-300">

          Emergency Email

          <span className="text-green-400 ml-2">
            (Optional)
          </span>

        </label>

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <Mail
            className="text-slate-400 mr-3"
            size={20}
          />

          <input
            type="email"
            placeholder="example@gmail.com"
            value={formData.emergencyEmail}
            onChange={(e) =>
              setFormData({
                ...formData,
                emergencyEmail: e.target.value,
              })
            }
            className="w-full bg-transparent outline-none py-4"
          />

        </div>

      </div>

      {/* Information Box */}

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-10">

        <div className="flex gap-3">

          <Info
            className="text-blue-400 mt-1"
            size={20}
          />

          <div>

            <h3 className="font-semibold mb-2">
              Alert Information
            </h3>

            <ul className="text-slate-400 space-y-2 text-sm">

              <li>
                ✅ Alerts will always be sent to your registered Google email.
              </li>

              <li>
                ✅ Alerts will always be sent to your registered mobile number.
              </li>

              <li>
                ✅ If emergency contact details are provided,
                alerts will also be sent to them.
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-between">

        <button
          onClick={back}
          className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-xl"
        >
          ← Back
        </button>

        <button
          onClick={next}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl"
        >
          Continue →
        </button>

      </div>

    </div>

  );

}