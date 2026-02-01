// src/services/redx.js
import axios from "axios";

const API_BASE = "https://sandbox.redx.com.bd/v1.0.0-beta";
const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."; // your token

export const trackParcel = async (trackingId) => {
    return axios.get(`${API_BASE}/parcel/track/${trackingId}`, {
        headers: {
            "API-ACCESS-TOKEN": TOKEN,
        },
    });
};
