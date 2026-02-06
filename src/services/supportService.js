const API = "http://localhost:5000/api/support";

export const fetchTicketsAPI = async () => (await fetch(API)).json();
export const addTicketAPI = async (data) =>
  (await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })).json();
export const updateTicketAPI = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const deleteTicketAPI = async (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });
