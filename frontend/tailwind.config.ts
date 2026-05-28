import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        netflix: "#e50914",
        ember: "#f5c542",
      },
      boxShadow: {
        hero: "inset 0 -220px 160px #070809, inset 520px 0 260px rgba(0, 0, 0, 0.72)",
      },
    },
  },
  plugins: [],
} satisfies Config;
