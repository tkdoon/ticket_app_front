import { server_url } from "../config";

export default async function apiFetch(path, options = {}) {
  const response = await fetch(server_url + path, {
    credentials: "include",
    ...options,
  });
  if (response.status === 401 || response.status === 403) {
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }
  if (!response.ok) {
    let body = null;
    try {
      body = await response.json();
    } catch {
      // ignore non-JSON body
    }
    const error = new Error(body?.message || `API error: ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return response;
}
