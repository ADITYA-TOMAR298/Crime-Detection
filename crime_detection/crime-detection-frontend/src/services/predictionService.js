import api from "./api";

export async function getPrediction() {
  try {
    const { data } = await api.get("/prediction");
    return data;
  } catch (error) {
    console.error("Prediction API error:", error);
    return null;
  }
}