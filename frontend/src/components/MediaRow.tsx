import { IMAGE_BASE } from "../lib/api";
import { cn } from "../lib/utils";
import type { MediaItem } from "../types";

export function MediaRow({ title, items }: { title: string; items: MediaItem[] }) {
  return (
    <section className="mt-8 px-5 sm:px-10 lg:px-14">
      <h2 className="mb-4 text-xl font-black tracking-normal sm:text-2xl">{title}</h2>
      <div className="grid auto-cols-[minmax(150px,190px)] grid-flow-col gap-4 overflow-x-auto pb-3">
        {items
          .filter((item) => item.poster_path)
          .map((item) => (
            <article className={cn("overflow-hidden rounded-lg bg-[#161719]")} key={`${item.media_type || "item"}-${item.id}`}>
              <img className="aspect-[2/3] w-full object-cover" src={`${IMAGE_BASE}${item.poster_path}`} alt={item.title || item.name} />
              <div className="min-h-[88px] p-3">
                <h3 className="mb-2 text-sm font-black leading-tight tracking-normal">{item.title || item.name}</h3>
                <p className="font-black text-ember">{item.vote_average ? item.vote_average.toFixed(1) : "New"}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
