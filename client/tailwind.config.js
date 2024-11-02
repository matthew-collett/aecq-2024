export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        header: '60px',
      },
      colors: {
        primary: '#c8c0ab',
        secondary: '#6d685a',
        accent: '#064804',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        light: '#ffffff',
        dark: '#636364',
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
