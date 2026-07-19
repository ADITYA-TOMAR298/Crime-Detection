import { useEffect, useState } from "react";
import { getPrediction } from "../services/predictionService";

const REFRESH_INTERVAL = 500; // milliseconds

export default function usePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    async function fetchPrediction() {
      try {
        const data = await getPrediction();
        if (data) {
          setPrediction(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrediction();

    intervalId = setInterval(fetchPrediction, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return {
    prediction,
    loading,
  };
}