import { useEffect, useState } from "react";
import { getStatus } from "../services/statusService";

export default function useStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let timer;

    async function fetchStatus() {
      try {
        const data = await getStatus();
        setStatus(data);
      } catch (error) {
        console.error("Status error:", error);
      }
    }

    fetchStatus();

    timer = setInterval(fetchStatus, 1000);

    return () => clearInterval(timer);
  }, []);

  return status;
}