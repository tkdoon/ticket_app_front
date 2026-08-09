import apiFetch from "./apiFetch";

export default async function fetchUserProfile() {
  const response = await apiFetch("/user/me");
  return response.json();
}
