const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust the path as per your project
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans], // Modern sans-serif font
        roboto: ["Roboto", "Arial", "sans-serif"], // Clean and readable
        lora: ["Lora", "serif"], // Elegant serif font
        montserrat: ["Montserrat", "Arial", "sans-serif"], // Geometric sans-serif
        lato: ["Lato", "Arial", "sans-serif"], // Friendly and open
        opensans: ["Open Sans", "Helvetica", "sans-serif"], // Modern sans-serif
        raleway: ["Raleway", "Arial", "sans-serif"], // Minimalist sans-serif
        playfair: ["Playfair Display", "serif"], // High contrast serif for elegance
        nunito: ["Nunito", "sans-serif"], // Rounded sans-serif
      },
    },
  },
  plugins: [],
};
