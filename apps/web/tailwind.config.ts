import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        brand: { DEFAULT: "#21c6a8", ink: "#07231f" }
      },
      boxShadow: { glow: "0 18px 80px rgba(33,198,168,.18)" }
    }
  },
  plugins: []
} satisfies Config;
