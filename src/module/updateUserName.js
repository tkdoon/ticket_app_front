import apiFetch from "./apiFetch";

export default async function updateUserName(userName) {
  await apiFetch("/user/update-name", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName }),
  });
}
