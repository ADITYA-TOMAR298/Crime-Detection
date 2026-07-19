import api from "./api";

export async function getStatus() {
  try {
    const { data } = await api.get("/status");
    return data;
  } catch (error) {
    console.error("Status API error:", error);
    return null;
  }
}