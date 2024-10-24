import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        phone1: "321px",
        phone2: "480px",
        tablet: "768px",
        notebook: "1024px",
        monitor1: "1280px",
        monitor2: "1600px",
        monitor3: "1920px"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellowcus: "#FFFC00",
        purplecus: "#6C0AAB",
      },
    },
  },
  plugins: [],
};
export default config;
