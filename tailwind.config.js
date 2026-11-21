/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F1EA',
        burgundy: { DEFAULT: '#6B1E2B', dark: '#521620' },
        choco: '#4A2C21',
        blush: '#E8C4C4',
        denim: '#5B7BA0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        ar: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      aspectRatio: { portrait: '4 / 5' },
    },
  },
  plugins: [],
}
