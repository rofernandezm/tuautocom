import { theme } from './js/config/theme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': theme.colors.primaryDark,
        'primary-medium': theme.colors.primaryMedium,
        'primary-light': theme.colors.primaryLight,
      },
      fontFamily: {
        sans: theme.fonts.sans,
      },
    },
  },
  plugins: [],
}
