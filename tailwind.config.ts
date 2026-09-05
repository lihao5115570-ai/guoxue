import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rice: "#F7F4EC",
        ink: "#11110F",
        muted: "#77736B",
        gold: "#C9A86A",
        deepgold: "#9C7B46",
        night: "#090909"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17,17,15,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
