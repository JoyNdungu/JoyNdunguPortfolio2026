/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'font-doodle',
    'font-fun',
    'font-body',
    'font-serif',
    'font-display',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Times New Roman"', 'serif'],
        body:    ['Quicksand', 'sans-serif'],
        serif:   ['"Noto Serif"', 'serif'],
        fun:     ['"Dancing Script"', 'cursive'],
        doodle:  ['"Rubik Doodle Shadow"', 'cursive'],
      },
    },
  },
  plugins: [],
}