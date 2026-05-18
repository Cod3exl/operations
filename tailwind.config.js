/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#F5F0E8',
          gold: '#C9A84C',
          charcoal: '#2C2C2C',
          linen: '#EDE8DC',
          muted: '#7A6E5F',
          danger: '#B94040',
          success: '#4A7C59',
          warning: '#C9893C',
          border: '#E0D8C8',
          blue: '#4A6B9C',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
