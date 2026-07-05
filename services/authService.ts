import request from "./api";
import { saveToken, removeToken } from "./storage";

export async function register(name: string, email: string, password: string) {
  const data = await request("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  await saveToken(data.token);
  return data.user;
}

export async function login(email: string, password: string) {
  const data = await request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await saveToken(data.token);
  return data.user;
}

export async function logout() {
  await request("/logout", { method: "POST" });
  await removeToken();
}