import apiFetch from "./apiFetch";

export default async function createTicket({ title, description, expiringDate, ownerId }) {
  await apiFetch("/ticket/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, expiringDate, ownerId }),
  });
}
