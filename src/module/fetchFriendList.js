import apiFetch from "./apiFetch";

export default async function fetchFriendList() {
  const response = await apiFetch("/friend/list");
  return response.json();
}
