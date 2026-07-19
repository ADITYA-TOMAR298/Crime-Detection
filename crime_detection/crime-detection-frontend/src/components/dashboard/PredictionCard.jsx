import { ShieldAlert } from "lucide-react";
import usePrediction from "../../hooks/usePrediction";

export default function PredictionCard() {

    const { prediction } = usePrediction();

    if (!prediction)
        return null;

    const anomaly = prediction.prediction !== "Normal";

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <div className="flex justify-between">

                <h3>Prediction</h3>

                <ShieldAlert />

            </div>

            <h2
                className={`text-3xl mt-5 font-bold ${
                    anomaly ? "text-red-500" : "text-green-500"
                }`}
            >
                {prediction.prediction}
            </h2>

            <p className="text-slate-400 mt-3">

                Confidence {(prediction.confidence * 100).toFixed(2)}%

            </p>

        </div>

    );

}