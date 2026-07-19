import { Cpu } from "lucide-react";
import usePrediction from "../../hooks/usePrediction";

export default function ProcessingCard() {

    const { prediction } = usePrediction();

    if (!prediction)
        return null;

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <div className="flex justify-between">

                <h3>Performance</h3>

                <Cpu />

            </div>

            <div className="mt-5 space-y-3">

                <div>

                    FPS

                    <div className="font-bold text-xl">

                        {prediction.fps.toFixed(1)}

                    </div>

                </div>

                <div>

                    Processing

                    <div className="font-bold text-xl">

                        {(prediction.processing_time * 1000).toFixed(1)} ms

                    </div>

                </div>

            </div>

        </div>

    );

}