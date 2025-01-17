import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      xs: "8px",
      sm: "12px",
      md: "24px",
      lg: "48px",
      xl: "64px",
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        onPrimary: "var(--on-primary)",
        secondary: "var(--secondary)",
        onSecondary: "var(--on-secondary)",
        tile: "var(--tile)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        info: "var(--info)",
        error: "var(--error)",
        warning: "var(--warning)",
      },
    },
  },
  plugins: [],
} satisfies Config;
