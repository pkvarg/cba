/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  extend: {
    colors: {
      lightbg: '#f9f9f9',
      white: '#ffffff',
      greyline: '#cdd3d7',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,

      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.warmGray,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.blueGray,
      green: colors.green,
      red: colors.red,
    },
  },

  plugins: [],
}
