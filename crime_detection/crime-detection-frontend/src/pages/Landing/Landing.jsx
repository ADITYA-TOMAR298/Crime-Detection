import { Link } from "react-router-dom";
import { BellRing, Camera, Grid2X2, ScanFace, Shield, Siren } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";

export default function Landing() {
  return (
    <>
        <Navbar />
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="mb-6 flex items-center justify-center gap-4">
            <Shield className="h-16 w-16 text-red-500 sm:h-20 sm:w-20" />
            <h1 className="text-4xl font-bold sm:text-5xl">
              AI CRIME DETECTION
            </h1>
          </div>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">

            Real-time surveillance powered by Artificial Intelligence for
            anomaly detection and instant emergency alerts.

          </p>

          <br />

          <Link
            to="/login"
            className="mt-10 inline-flex min-h-16 items-center gap-3 rounded-full bg-gradient-to-r from-red-700 to-red-600 px-10 py-5 text-lg font-bold leading-none text-white shadow-[0_10px_22px_rgba(127,29,29,0.35)] transition hover:-translate-y-0.5 hover:from-red-600 hover:to-red-500"
          >
            {/* <Grid2X2 size={22} strokeWidth={2.5} /> */}
            <p className="p-1 ml-1">Get Started</p>
          </Link>

        </motion.div>

      </section>

      {/* Features */}

      <section id="features" className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:px-12">
        <p className="mb-14 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Core capabilities</p>

        <div className="w-full space-y-16">

        <FeatureCard
          icon={<Camera size={40} />}
          title="Real-Time Video Surveillance"
          description="Monitors live CCTV or webcam feeds continuously through a browser-based dashboard, enabling real-time surveillance, camera management, and seamless monitoring from any location."
        />

        <FeatureCard
          icon={<Shield size={40} />}
          title="AI-Powered Crime Detection"
          description="Uses I3D feature extraction and a Transformer-based model to analyze video streams and accurately detect suspicious or criminal activities in real time."
        />

        <FeatureCard
          icon={<BellRing size={40} />}
          title="Instant Incident Alerts"
          description="Sends immediate alerts with incident details, timestamp, camera location, and confidence score, allowing users to respond quickly while reducing unnecessary notifications."
        />

        <FeatureCard
          icon={<ScanFace size={40} />}
          title="Criminal Face Recognition"
          description="Recognizes faces from live video feeds and matches them with a criminal database, instantly displaying the person's identity and criminal records when a match is found."
        />
        </div>
      </section>

      <section id="about" className="flex min-h-screen items-center border-y border-slate-800 bg-slate-900/50 px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Siren size={38} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">About the project</p>
            <h2 className="mt-3 text-3xl font-bold">A smarter response to security incidents.</h2>
            <p className="mt-6 leading-8 text-black text-[18px]">AI Crime Detection is a browser-based surveillance platform that combines live video monitoring, deep-learning anomaly detection, incident alerts, and face recognition. It helps security teams identify potential threats sooner and access the context they need to act quickly.</p>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="mx-auto flex max-w-3xl flex-col items-center px-6 py-4 text-center sm:px-10"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        {icon}
      </div>

      <h2 className="mb-4 text-2xl font-semibold">
        {title}
      </h2>

      <p className="leading-7 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
