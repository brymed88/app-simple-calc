/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './App.{js,ts,tsx}',
      './components/**/*.{js,ts,tsx}',
      '/contexts/*.{js,ts,tsx}',
      '/utils/*.{js,ts,tsx}',
   ],

   presets: [require('nativewind/preset')],
   theme: {
      extend: {
         colors: {
            // Create dynamic theme colors using CSS variables
            primary: 'rgb(var(--color-primary) / <alpha-value>)',
            secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
            background: 'rgb(var(--color-background) / <alpha-value>)',
            text: 'rgb(var(--color-text) / <alpha-value>)',
         },
      },
   },
   plugins: [
      // Set default values for CSS variables
      ({ addBase }) =>
         addBase({
            ':root': {
               '--color-primary': '0 122 255', // iOS blue
               '--color-secondary': '236 236 236', // Light gray
               '--color-background': '255 255 255', // White
               '--color-text': '0 0 0', // Black
            },
         }),
   ],
}
