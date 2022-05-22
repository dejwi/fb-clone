module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'nav': '1fr 6rem 1fr',
        'invite': '3.4rem 1fr',
      }
    },
  },
  plugins: [],
}
