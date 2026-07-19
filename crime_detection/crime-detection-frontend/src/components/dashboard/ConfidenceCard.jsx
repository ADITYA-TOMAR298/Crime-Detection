import { BarChart3 } from "lucide-react";
import usePrediction from "../../hooks/usePrediction";

export default function ConfidenceCard() {

    const { prediction } = usePrediction();

    if (!prediction)
        return null;

    const percent = prediction.confidence * 100;

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <div className="flex justify-between">

                <h3>Confidence</h3>

                <BarChart3 />

            </div>

            <h2 className="text-3xl font-bold mt-5">

                {percent.toFixed(2)}%

            </h2>

            <div className="mt-4 h-2 rounded-full bg-slate-700">

                <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{
                        width: `${percent}%`,
                    }}
                />

            </div>

        </div>

    );

}