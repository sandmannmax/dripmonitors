module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#db3e3e',
      secondary: '#2c3e50',
      back: '#fafafa',
      accent: '#f5bf64'
    })
  },
  variants: {
    extend: {}
  },
  plugins: []
}
