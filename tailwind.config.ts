import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F2FCE2",
          foreground: "#1A1A1A",
        },
        warning: {
          DEFAULT: "#FFDEE2",
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "firework-1": {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translate(-20px, -20px)", opacity: "0" },
        },
        "firework-2": {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translate(20px, -20px)", opacity: "0" },
        },
        "firework-3": {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translate(-20px, 20px)", opacity: "0" },
        },
        "firework-4": {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translate(20px, 20px)", opacity: "0" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        "firework-1": "firework-1 1s ease-out forwards",
        "firework-2": "firework-2 1s ease-out forwards",
        "firework-3": "firework-3 1s ease-out forwards",
        "firework-4": "firework-4 1s ease-out forwards",
        "scale-up": "scale-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;