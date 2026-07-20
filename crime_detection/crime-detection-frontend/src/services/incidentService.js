import axios from "axios";

const API = "http://localhost:8000";

export async function getActiveIncident() {
    const res = await axios.get(`${API}/active_incident`);
    return res.data;
}

export async function getIncidentHistory() {
    const res = await axios.get(`${API}/incidents`);
    return res.data;
}

export async function acknowledgeIncident(id) {
    const res = await axios.post(
        `${API}/incident/${id}/acknowledge`
    );
    return res.data;
}