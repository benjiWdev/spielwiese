import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      xxs: "4px",
      xs: "8px",
      sm: "12px",
      md: "24px",
      lg: "48px",
      xl: "64px",
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        onPrimary: "var(--on-primary)",
        onPrimaryHover: "var(--on-primary-hover)",
        secondary: "var(--secondary)",
        secondaryHover: "var(--secondary-hover)",
        onSecondary: "var(--on-secondary)",
        onSecondaryHover: "var(--on-secondary-hover)",
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
