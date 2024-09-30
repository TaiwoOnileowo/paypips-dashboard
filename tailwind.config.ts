import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        harsh: "#A0AEC0",
        "dark-bg": "#14181f",
        "dark-surface": "#1a1a1a",
        "accent-bg": "#2f323b",
        "light-text": "#f0f2f5",
        "muted-text": "#d1d6e1",
        "light-bg": "#fff",
        "dark-text": "#1b1f28",
        "accent-text": "#fff",
        "primary-purple": "#5e19b3",
        "light-gray": "#ebecf0",
        "medium-gray": "#363f52",
        "blue-accent": "#3d87f5",
        "gray-background": "#f4f5f7",
        "subtle-bg": "#246763",
        "light-blue": "#e8f0fc",
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
        "primary-gradient1": "linear-gradient(135deg, #246763, #5e19b3)",
        "primary-gradient": "linear-gradient(90deg, #14181f 0%, #1a1a1a 100%)",
        "shining-gradient": "linear-gradient(135deg, #5e19b3, #3d87f5)",
        "white-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
        "black-gradient": "linear-gradient(90deg, #2f323b 0%, #ebecf0 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        move: "move 2s linear infinite",
      },
    },
    screens: {
      ip: "200px",
      xs: "250px",
      ss: "380px",
      ts: "600px",
      xsm: "700px",
      sm: "800px",
      msm: "1020px",
      bsm: "1100px",
      md: "1280px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
