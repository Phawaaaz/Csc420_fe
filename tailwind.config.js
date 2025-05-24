/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D3447',
          light: '#1A4D64',
          dark: '#0A2A39',
        },
        secondary: {
          DEFAULT: '#00CFFD',
          light: '#33D9FD',
          dark: '#00A6CA',
        },
        accent: {
          DEFAULT: '#FF9500',
          light: '#FFAA33',
          dark: '#E68600',
        },
        success: {
          DEFAULT: '#34C759',
          light: '#5AD27A',
          dark: '#2AA148',
        },
        warning: {
          DEFAULT: '#FFCC00',
          light: '#FFD633',
          dark: '#E6B800',
        },
        error: {
          DEFAULT: '#FF3B30',
          light: '#FF6259',
          dark: '#E63529',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};