import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          400: "#a3e635",
          500: "#84cc16",
        },
        neon: "#a3e635",
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
        body: ["Arial", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px #a3e635, 0 0 40px #a3e63566",
        "neon-sm": "0 0 10px #a3e635, 0 0 20px #a3e63533",
      },
      dropShadow: {
        neon: "0 0 8px #a3e635",
      },
    },
  },
  plugins: [],
};
export default config;
