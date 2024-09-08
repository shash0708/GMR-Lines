/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // Adjust the paths as needed
    "./public/**/*.html",           // Include HTML files if used
  ],
  theme: {
    extend: {
      // Custom theme extensions go here
      colors: {
        primary: '#ff6347',  // Example custom color
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins here
  ],
};


{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
