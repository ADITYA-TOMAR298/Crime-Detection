import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import userService from "../../services/userService";

export default function Login() {

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleLogin = async () => {

    try {

      const firebaseUser =
        await authService.loginWithGoogle();

      setUser({

        uid: firebaseUser.uid,

        name: firebaseUser.displayName,

        email: firebaseUser.email,

        photo: firebaseUser.photoURL,

      });

      try {
        await userService.getProfile(firebaseUser.uid);
        navigate("/dashboard");
      } catch (profileError) {
        if (profileError.response?.status === 404) {
          navigate("/onboarding");
        } else {
          console.error(profileError);
          alert("Unable to load your saved setup. Please try again.");
        }
      }

    }

    catch (err) {

      console.error(err);

      alert("Login failed");

    }

  };
  
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10">

        <div className="flex justify-center mb-6">

          <Shield
            size={55}
            className="text-red-500"
          />

        </div>

        <h1 className="text-3xl font-bold text-center mb-3">
          Welcome Back
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to continue monitoring your cameras.
        </p>

        <button
  onClick={handleLogin}
  className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-4 text-lg font-semibold transition"
>
  Continue with Google
</button>

      </div>

    </div>
  );
}
