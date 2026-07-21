import api from "./api";

export async function getCriminals() {
  const response = await api.get("/criminals");
  return response.data;
}

export async function addCriminal(data) {
  const response = await api.post("/criminals", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getActiveCriminalMatch() {
  const response = await api.get("/criminal_matches/active");
  return response.data;
}
