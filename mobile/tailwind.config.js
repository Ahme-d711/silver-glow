/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#192C56",
        secondary: "#D8D8D8",
        background: "#FAFAFA",
        "content-primary": "#0A0A0A",
        "content-secondary": "#12121299",
        divider: "#ECEBEE",
        success: "#007D47",
        error: "#9A0000",
        warning: "#F2BD00",
      }
    },
  },
  plugins: [],
};