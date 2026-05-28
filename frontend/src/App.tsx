import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { AppRoutes } from "./routes";
import type { AuthState, User } from "./types";

export function App() {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    const token = localStorage.getItem("streamflix_token");
    const user = localStorage.getItem("streamflix_user");
    return token && user ? { token, user: JSON.parse(user) as User } : null;
  });

  function handleAuth(nextAuth: AuthState) {
    localStorage.setItem("streamflix_token", nextAuth.token);
    localStorage.setItem("streamflix_user", JSON.stringify(nextAuth.user));
    setAuth(nextAuth);
  }

  function logout() {
    localStorage.removeItem("streamflix_token");
    localStorage.removeItem("streamflix_user");
    setAuth(null);
  }

  return (
    <div className="min-h-screen bg-[#070809] text-white">
      <AppHeader auth={auth} onLogout={logout} />
      <AppRoutes auth={auth} onAuthenticated={handleAuth} />
    </div>
  );
}
