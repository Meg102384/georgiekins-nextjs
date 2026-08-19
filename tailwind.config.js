/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#DDECFA',
        'blue-deep': '#C3DCF5',
        blush: '#FBE0E8',
        'blush-deep': '#F7CDD9',
        cream: '#FFF8F0',
        cocoa: '#6B4632',
        navy: '#2E4C7E',
        'navy-soft': '#4B679B',
        coral: '#F58FA8',
        'coral-deep': '#EE7295',
        sage: '#A9C69B',
        gold: '#F5B942',
        'line-blue': '#9FC3E8',
        'line-pink': '#F2AFC2',
        'pale-yellow': '#FDF0C4',
        'line-yellow': '#E8C24D',
        mint: '#D9F0E3',
        'line-mint': '#7FC79F',
        peach: '#FBE1D0',
        'line-peach': '#F0A876',
        teal: '#C2E7F5',
        'line-teal': '#3FA9CC',
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      borderRadius: {
        brand: '28px',
      },
    },
  },
  plugins: [],
};
