module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'nav': '1fr 6rem 1fr',
        'invite': '3.4rem 1fr',
        'postTop': 'max-content 1fr 2.5rem',
        'chat': '4rem 1fr'
      },
      gridTemplateRows: {
        'chat': '1fr 4rem'
      }
    },
  },
  plugins: [],
}
