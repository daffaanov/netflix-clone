import { Navigate, Route, Routes } from "react-router-dom";
import { AuthForm } from "./pages/AuthForm";
import { Browse } from "./pages/Browse";
import { Landing } from "./pages/Landing";
import type { AuthState } from "./types";

type AppRoutesProps = {
  auth: AuthState | null;
  onAuthenticated: (auth: AuthState) => void;
};

export function AppRoutes({ auth, onAuthenticated }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthForm mode="login" onAuthenticated={onAuthenticated} />} />
      <Route path="/register" element={<AuthForm mode="register" onAuthenticated={onAuthenticated} />} />
      <Route path="/browse" element={auth ? <Browse token={auth.token} /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to={auth ? "/browse" : "/"} replace />} />
    </Routes>
  );
}
