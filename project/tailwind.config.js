/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f6f8f6',
          100: '#e4ebe5',
          200: '#ccdccd',
          300: '#adc6af',
          400: '#8BAF8D',
          500: '#689c6a',
          600: '#528154',
          700: '#436844',
          800: '#375438',
          900: '#2f462f',
        },
        cream: {
          DEFAULT: '#FFF9F0',
          50: '#FFFFFF',
          100: '#FFF9F0',
          200: '#FFF0D9',
          300: '#FFE0B3',
          400: '#FFD08C',
          500: '#FFBF66',
        },
        accent: {
          50: '#fff0f6',
          100: '#ffe3ef',
          200: '#ffc6df',
          300: '#ff99c3',
          400: '#ff5c9a',
          500: '#ff2677',
          600: '#f20d5e',
          700: '#cc0a4e',
          800: '#a70c44',
          900: '#8b0f3d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'gradient-shift': 'gradientShift 4s ease-in-out infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
        'glitch1': 'glitch1 3s infinite linear alternate-reverse',
        'glitch2': 'glitch2 3s infinite linear alternate-reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textGlow: {
          '0%': { 
            filter: 'drop-shadow(0 0 5px rgba(255, 38, 119, 0.5)) drop-shadow(0 0 10px rgba(255, 38, 119, 0.3)) drop-shadow(0 0 15px rgba(255, 38, 119, 0.2))'
          },
          '100%': { 
            filter: 'drop-shadow(0 0 10px rgba(104, 156, 106, 0.5)) drop-shadow(0 0 20px rgba(104, 156, 106, 0.3)) drop-shadow(0 0 30px rgba(104, 156, 106, 0.2))'
          },
        },
        glitch1: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
          '100%': { transform: 'translateX(0)' },
        },
        glitch2: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(2px)' },
          '40%': { transform: 'translateX(-2px)' },
          '60%': { transform: 'translateX(1px)' },
          '80%': { transform: 'translateX(-1px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};