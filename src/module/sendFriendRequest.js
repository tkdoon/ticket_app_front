import apiFetch from "./apiFetch";

export default async function sendFriendRequest(addresseeId) {
  await apiFetch("/friend/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ addresseeId }),
  });
}
