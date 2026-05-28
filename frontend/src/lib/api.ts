import type { AuthState, TmdbResponse } from "../types";

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export async function authenticate(path: "login" | "register", payload: unknown): Promise<AuthState> {
  const response = await fetch(`${API_BASE}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await readJson(response)) as AuthState | { message?: string } | null;
  if (!response.ok) {
    throw new Error(errorMessage(data, `Authentication failed. Status: ${response.status}`));
  }
  return data as AuthState;
}

export async function loadTmdb(path: string, token: string): Promise<TmdbResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await readJson(response)) as TmdbResponse | { message?: string } | null;
  if (!response.ok) {
    throw new Error(errorMessage(data, `Could not load TMDB data. Status: ${response.status}`));
  }
  return data as TmdbResponse;
}

async function readJson(response: Response): Promise<unknown | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function errorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
    return data.message;
  }
  return fallback;
}
