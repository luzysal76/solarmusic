/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E4C76B',
          DEFAULT: '#C9A84C',
          dark: '#A07C2E',
        },
        cream: '#FAF7F2',
        dark: {
          DEFAULT: '#1A1208',
          light: '#2A1E0A',
          card: '#231A09',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Noto Serif KR', 'Georgia', 'serif'],
        'serif-kr': ['Noto Serif KR', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
