/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080",
        mint: "#70C1B3",
        background: "#F7FAFA",
        card: "#FFFFFF",
        textMain: "#2C3E50",
        textSecondary: "#7F8C8D",
        divider: "#E0E6ED",
      },
    },
  },
  plugins: [],
};
