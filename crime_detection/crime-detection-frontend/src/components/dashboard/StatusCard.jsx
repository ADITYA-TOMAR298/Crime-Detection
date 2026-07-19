import { CheckCircle2 } from "lucide-react";
import useStatus from "../../hooks/useStatus";

export default function StatusCard() {

    const status = useStatus();

    if (!status)
        return null;

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <div className="flex justify-between">

                <h3>Status</h3>

                <CheckCircle2 />

            </div>

            <div className="mt-5 space-y-3">

                <Status
                    label="Backend"
                    ok={status.backend_connected}
                />

                <Status
                    label="Camera"
                    ok={status.camera_connected}
                />

                <Status
                    label="Pipeline"
                    ok={status.running}
                />

            </div>

        </div>

    );

}

function Status({ label, ok }) {

    return (

        <div className="flex justify-between">

            <span>{label}</span>

            <span
                className={
                    ok
                        ? "text-green-400"
                        : "text-red-400"
                }
            >
                {ok ? "Connected" : "Disconnected"}
            </span>

        </div>

    );

}