import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 w-full rounded-md border border-white/20 bg-neutral-900 px-4 text-white outline-none ring-netflix/50 transition placeholder:text-zinc-500 focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}
