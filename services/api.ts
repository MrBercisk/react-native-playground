import { API_URL } from "@/constants/api";
import { getToken } from "./storage";

// fungsi pembantu: bikin request ke backend, otomatis nyelipin token kalau ada
async function request(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // kalau backend balikin error (validasi, dll), lempar biar bisa ditangkap di UI
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}

export default request;