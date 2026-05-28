import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "lg" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  default: "border-netflix bg-netflix text-white hover:bg-red-700",
  secondary: "border-white/25 bg-neutral-950/75 text-white hover:bg-neutral-900",
  ghost: "border-transparent bg-transparent text-zinc-300 hover:bg-white/10 hover:text-white",
  link: "border-transparent bg-transparent text-zinc-300 underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-10 px-4",
  lg: "min-h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button({ children, variant = "default", size = "default", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-extrabold tracking-normal transition disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
