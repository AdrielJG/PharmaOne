/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure all files are scanned
  // other Tailwind config...
}
