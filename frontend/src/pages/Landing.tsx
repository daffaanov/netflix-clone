import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function Landing() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[92vh] items-center bg-[linear-gradient(90deg,rgba(0,0,0,.86),rgba(0,0,0,.62)_44%,rgba(0,0,0,.16)),url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center px-6 pb-20 pt-32 lg:px-[72px]">
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070809] to-transparent" />
      <section className="relative z-[1] max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-ember">Movies, TV, and weekly trending picks</p>
        <h1 className="text-6xl font-black leading-none tracking-normal sm:text-7xl lg:text-8xl">StreamFlix</h1>
        <p className="my-6 max-w-2xl text-lg leading-7 text-zinc-100 sm:text-xl">
          Explore TMDB-powered titles in a Netflix-style app with JWT login, secure registration, and a private browsing
          experience.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => navigate("/register")}>
            <UserPlus size={20} />
            Create Account
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate("/login")}>
            <LogIn size={20} />
            Login
          </Button>
        </div>
      </section>
    </main>
  );
}
