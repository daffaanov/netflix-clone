import { LogIn, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { AuthState } from "../types";

type AppHeaderProps = {
  auth: AuthState | null;
  onLogout: () => void;
};

export function AppHeader({ auth, onLogout }: AppHeaderProps) {
  const navigate = useNavigate();
  const authenticated = Boolean(auth?.token);

  function logout() {
    onLogout();
    navigate("/", { replace: true });
  }

  return (
    <header className="fixed top-0 z-10 flex w-full items-start justify-between gap-4 bg-gradient-to-b from-black/90 to-black/0 px-5 py-4 sm:items-center lg:px-14">
      <button
        className="text-3xl font-black tracking-normal text-netflix sm:text-4xl"
        onClick={() => navigate(authenticated ? "/browse" : "/")}
      >
        StreamFlix
      </button>
      <nav className="flex flex-wrap items-center justify-end gap-3">
        {authenticated && auth ? (
          <>
            <span className="max-w-[180px] truncate font-bold text-zinc-200">{auth.user.fullName}</span>
            <Button variant="secondary" onClick={logout}>
              <LogOut size={18} />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              <LogIn size={18} />
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>
              <UserPlus size={18} />
              Register
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
