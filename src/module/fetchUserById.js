import apiFetch from "./apiFetch";

export default async function fetchUserById(id) {
  const response = await apiFetch(`/user/${id}`);
  return response.json();
}
