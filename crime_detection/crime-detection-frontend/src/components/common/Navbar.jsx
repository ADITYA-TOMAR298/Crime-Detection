import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Shield className="text-red-500" size={32} />

          <span className="text-2xl font-bold">
            AI Crime Detection
          </span>
        </Link>

        <div className="flex items-center gap-5 text-slate-300 sm:gap-8">

          <a href="#home" className="hover:text-white">
            Home
          </a>

          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#about" className="hover:text-white">
            About
          </a>

          <Link
            to="/login"
            className="hover:text-white transition"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}
