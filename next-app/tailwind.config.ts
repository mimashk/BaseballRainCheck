import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        secondary: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        accent: {
          DEFAULT: '#f39c12',
          dark: '#e67e22',
        },
        success: {
          DEFAULT: '#27ae60',
          dark: '#229954',
        },
        warning: {
          DEFAULT: '#f1c40f',
          dark: '#f39c12',
        },
        danger: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
      },
    },
  },
  plugins: [],
}
export default config