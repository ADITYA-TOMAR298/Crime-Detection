import axios from "axios";

const API = "http://localhost:8000";

export async function getCriminals() {
  const response = await axios.get(`${API}/criminals`);
  return response.data;
}

export async function addCriminal(data) {
  const response = await axios.post(`${API}/criminals`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getActiveCriminalMatch() {
  const response = await axios.get(`${API}/criminal_matches/active`);
  return response.data;
}
