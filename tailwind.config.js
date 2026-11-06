/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#040814',
          900: '#070E22',
          800: '#0D1836',
          700: '#16254D',
        },
        gold: {
          300: '#F5E09B',
          400: '#E8C563',
          500: '#D4AF37',
          600: '#B58E24',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E09B 0%, #D4AF37 50%, #B58E24 100%)',
        'midnight-radial': 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.14), transparent 55%), radial-gradient(circle at bottom left, rgba(22, 37, 77, 0.6), transparent 60%)',
      }
    },
  },
  plugins: [],
}
