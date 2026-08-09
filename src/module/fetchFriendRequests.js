import apiFetch from "./apiFetch";

export default async function fetchFriendRequests() {
  const response = await apiFetch("/friend/requests");
  return response.json();
}
