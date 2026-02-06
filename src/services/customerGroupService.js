const API = "http://localhost:5000/api/customer-groups";

export const fetchGroupsAPI = async () =>
  (await fetch(API)).json();

export const addGroupAPI = async (data) =>
  (await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })).json();

export const updateGroupAPI = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteGroupAPI = async (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });
