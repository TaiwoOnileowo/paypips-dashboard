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
        background: "var(--background)",
        foreground: "var(--foreground)",
        harshBlue: "#1A1F37",
        sharpBlue: "#0075FF",
      },
      backgroundImage: {
        sidebar:
          " linear-gradient(112deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0.00) 100%)",
        smile: "url('/images/smile.jpg')",
        gradient1:
          "linear-gradient(127deg, #0F123B 100%, #090D2E 100%, #020515 100%)",
        gradient2: "linear-gradient(112deg, #060B28BD 59.3%, #0A0E23B5 100%)",
        gradient3: "linear-gradient(112deg, #060C29 59.3%, #040C3080 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
