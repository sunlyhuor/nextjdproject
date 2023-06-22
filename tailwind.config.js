/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
    //   ".src//pages/**/*.{ts,tsx,js,jsx}",
    //   "./public/**/*.html",
    // ],
    content: [
      "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./public/**/*.html",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.4)' , border:"2px solid blue" },
        },
        spin:{
          "0%":{
            transform:"rotate(0deg)"
          },
          "100%":{
            transform:"rotate(360deg)"
          }
        }
      },
      animation: {
        scale: 'scale 1s ease-in-out alternate infinite',
        spin: 'spin 2s ease-in-out infinite',
      }
    },
  },
}
