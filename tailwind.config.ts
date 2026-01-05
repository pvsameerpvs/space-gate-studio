import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["var(--font-stalinist)", "cursive"],
        heading: ["var(--font-headland)", "serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "SFMono-Regular"],
        ui: ["var(--font-play)", "sans-serif"],
        body: ["var(--font-raleway)", "sans-serif"],
        stalinist: ["var(--font-stalinist)", "cursive"],
        play: ["var(--font-play)", "sans-serif"],
        headland: ["var(--font-headland)", "serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        "press-start": ["var(--font-press-start)", "cursive"]
      },
      colors: {
        bg: "hsl(230 35% 5%)",
        panel: "hsl(228 28% 10%)",
        line: "hsl(230 25% 22%)",
        neon: {
          blue: "hsl(205 100% 60%)",
          purple: "hsl(270 100% 70%)",
          cyan: "hsl(180 100% 55%)"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(88, 231, 255, 0.25), 0 20px 60px rgba(0,0,0,0.6)",
        neon: "0 0 30px rgba(88, 231, 255, 0.35)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" }
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-60%)" },
          "100%": { transform: "translateX(160%)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        scan: "scan 4s linear infinite",
        shimmer: "shimmer 1.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
