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
        lightGray: "rgba(226, 232, 240, 0.30)",
      },
      backgroundImage: {
        sidebar:
          " linear-gradient(112deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0.00) 100%)",
        smile: "url('/images/smile.jpg')",
        gradient1:
          "linear-gradient(127deg, #0F123B 100%, #090D2E 100%, #020515 100%)",
        gradient2: "linear-gradient(127deg, #060B26E3 100%, #1A1F3780 100%)",
        gradient_bg: "url('/images/background.png')",
        shadow: "url('/shadow.svg')",
        ico_bg: "url('/ico-bg.svg')",
        paymethod_bg: "url('/paymethod-bg.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
