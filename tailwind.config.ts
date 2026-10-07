import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        card: "var(--card)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-text": "var(--accent-text)",
        ink: "#0A0A0F",
        ok: "var(--ok)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 50px -24px rgba(255, 153, 0, 0.65)",
      },
      keyframes: {
        packet: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(360%)" },
        },
        "packet-y": {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(280%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        packet: "packet 2.2s linear infinite",
        "packet-y": "packet-y 1.6s linear infinite",
        floaty: "floaty 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
