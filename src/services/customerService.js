const API = "http://localhost:5000/api/customers";

export const fetchCustomersAPI = async () => {
  const res = await fetch(API);
  return res.json();
};

export const updateCustomerAPI = async (id, data) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};


export const deleteCustomerAPI = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
