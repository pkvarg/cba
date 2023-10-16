/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: '#2e2236',
      lightbg: '#f9f9f9',
      white: '#ffffff',
      greyline: '#cdd3d7',
      'message-red': '#EE4B2B',
      'message-green': '#039f2f',
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
