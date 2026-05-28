import { FormEvent, useEffect, useMemo, useState } from "react";
import { Play, Search } from "lucide-react";
import { MediaRow } from "../components/MediaRow";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IMAGE_BASE, loadTmdb } from "../lib/api";
import type { MediaItem } from "../types";

export function Browse({ token }: { token: string }) {
  const [rows, setRows] = useState({ trending: [] as MediaItem[], movies: [] as MediaItem[], tv: [] as MediaItem[] });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [error, setError] = useState("");

  const featured = useMemo(() => rows.trending.find((item) => item.backdrop_path) || rows.trending[0], [rows.trending]);

  useEffect(() => {
    Promise.all([
      loadTmdb("/api/tmdb/trending", token),
      loadTmdb("/api/tmdb/movies/popular", token),
      loadTmdb("/api/tmdb/tv/popular", token),
    ])
      .then(([trending, movies, tv]) =>
        setRows({ trending: trending.results || [], movies: movies.results || [], tv: tv.results || [] }),
      )
      .catch((caught: unknown) => setError(caught instanceof Error ? caught.message : "Could not load TMDB data."));
  }, [token]);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const data = await loadTmdb(`/api/tmdb/search?query=${encodeURIComponent(query.trim())}`, token);
      setResults(data.results || []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not search TMDB.");
    }
  }

  return (
    <main className="pb-12">
      {featured && (
        <section
          className="flex min-h-[76vh] items-end bg-cover bg-center px-6 pb-16 pt-32 shadow-hero lg:px-[72px]"
          style={{ backgroundImage: `url(${IMAGE_BASE}${featured.backdrop_path})` }}
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-normal text-ember">Featured this week</p>
            <h1 className="text-5xl font-black leading-none tracking-normal sm:text-7xl">{featured.title || featured.name}</h1>
            <p className="my-5 max-w-2xl text-base leading-7 text-zinc-100 sm:text-xl">{featured.overview}</p>
            <Button size="lg">
              <Play size={20} />
              Play Preview
            </Button>
          </div>
        </section>
      )}

      <form
        className="mx-5 mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-white/10 bg-[#111214] p-3 sm:mx-10 sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:mx-14"
        onSubmit={search}
      >
        <Search size={20} />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies and TV shows"
        />
        <Button className="col-span-2 sm:col-span-1">Search</Button>
      </form>

      {error && <p className="mx-5 mt-4 rounded-md bg-netflix/20 p-3 text-sm font-semibold text-red-200 sm:mx-10 lg:mx-14">{error}</p>}
      {results.length > 0 && <MediaRow title="Search Results" items={results} />}
      <MediaRow title="Trending Now" items={rows.trending} />
      <MediaRow title="Popular Movies" items={rows.movies} />
      <MediaRow title="Popular TV" items={rows.tv} />
    </main>
  );
}
