import apiFetch from "./apiFetch";

export default async function logout() {
  await apiFetch("/auth/logout", { method: "POST" });
}
