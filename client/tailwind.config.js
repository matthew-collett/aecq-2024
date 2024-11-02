export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        header: '60px',
      },
      colors: {
        primary: '#4CAF50',
        secondary: '#795548',
        accent: 'var(--color-accent)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
        white: 'var(--color-white)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        logo: 'var(--font-logo)',
      },
    },
  },
  plugins: [],
}
