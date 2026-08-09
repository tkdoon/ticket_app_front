import apiFetch from "./apiFetch";

export default async function acceptFriendRequest(requesterId) {
  await apiFetch("/friend/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requesterId }),
  });
}
