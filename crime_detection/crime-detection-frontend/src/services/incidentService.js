import api from "./api";

export async function getActiveIncident() {
    const res = await api.get("/active_incident");
    return res.data;
}

export async function getIncidentHistory() {
    const res = await api.get("/incidents");
    return res.data;
}

export async function acknowledgeIncident(id) {
    const res = await api.post(`/incident/${id}/acknowledge`);
    return res.data;
}
