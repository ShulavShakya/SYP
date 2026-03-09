/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080", //Used for the header, primary buttons
        mint: "#70C1B3", //Used for highlights, hover states, and supporting UI elements
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
