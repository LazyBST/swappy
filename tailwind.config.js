const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        cyan: colors.cyan,
        purple: colors.purple,
      },
    },
  },
  variants: {},
  plugins: [],
};
