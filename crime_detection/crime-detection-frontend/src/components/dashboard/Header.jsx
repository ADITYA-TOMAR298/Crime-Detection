import { Shield } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Header() {

  const { user } = useAuth();

  return (

    <header className="h-20 border-b border-slate-800 bg-slate-900 flex justify-between items-center px-8">

      <div className="flex items-center gap-4">

        <Shield
          size={34}
          className="text-red-500"
        />

        <div>

          <h2 className="text-2xl font-bold">
            CrimeDetect AI
          </h2>

          <p className="text-slate-400 text-sm">
            AI Surveillance Dashboard
          </p>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <span className="text-green-400">
            Connected
          </span>

        </div>

        <div className="flex items-center gap-3">

          <img
            src={user?.photo}
            alt=""
            className="w-11 h-11 rounded-full"
          />

          <div>

            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-slate-400 text-sm">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}