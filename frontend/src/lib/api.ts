import type { AuthState, TmdbResponse } from "../types";

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export async function authenticate(path: "login" | "register", payload: unknown): Promise<AuthState> {
  const response = await fetch(`${API_BASE}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as AuthState | { message?: string };
  if (!response.ok) {
    throw new Error("message" in data ? data.message : "Authentication failed.");
  }
  return data as AuthState;
}

export async function loadTmdb(path: string, token: string): Promise<TmdbResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await response.json()) as TmdbResponse | { message?: string };
  if (!response.ok) {
    throw new Error("message" in data ? data.message : "Could not load TMDB data.");
  }
  return data as TmdbResponse;
}
