/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Overriding the default blue with your custom #03b1fc theme
        blue: {
          400: '#4bc7fc', // Lighter highlight
          500: '#03b1fc', // Your exact hex code (Base Theme)
          600: '#028ecb', // Slightly darker for hover states
          700: '#026f9e', // Dark border states
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}