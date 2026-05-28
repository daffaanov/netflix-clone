import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { Button } from "../components/ui/button";
import { authenticate } from "../lib/api";
import type { AuthFormState, AuthState } from "../types";

type AuthFormProps = {
  mode: "login" | "register";
  onAuthenticated: (auth: AuthState) => void;
};

export function AuthForm({ mode, onAuthenticated }: AuthFormProps) {
  const navigate = useNavigate();
  const isRegister = mode === "register";
  const [form, setForm] = useState<AuthFormState>({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const payload = isRegister ? form : { email: form.email, password: form.password };

    try {
      const data = await authenticate(isRegister ? "register" : "login", payload);
      onAuthenticated(data);
      navigate("/browse", { replace: true });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.86)),url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center px-5 pb-12 pt-28">
      <form className="w-full max-w-[430px] rounded-lg border border-white/10 bg-black/80 p-6 sm:p-8" onSubmit={submit}>
        <h1 className="mb-6 text-3xl font-black tracking-normal">{isRegister ? "Create your account" : "Welcome back"}</h1>
        {isRegister && (
          <TextField
            label="Full name"
            value={form.fullName}
            onChange={(value) => setForm({ ...form, fullName: value })}
            minLength={2}
            maxLength={150}
            required
          />
        )}
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => setForm({ ...form, email: value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          minLength={6}
          required
        />
        {error && <p className="mb-4 rounded-md bg-netflix/20 p-3 text-sm font-semibold text-red-200">{error}</p>}
        <Button className="mt-1 w-full" disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => navigate(isRegister ? "/login" : "/register")}
        >
          {isRegister ? "Already have an account? Login" : "Need an account? Register"}
        </Button>
      </form>
    </main>
  );
}
