export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        header: '60px',
      },
      colors: {
        'primary': '#c8c0ab',
        'secondary': '#6d685a',
        'accent': '#484232',
        'danger': 'var(--color-danger)',
        'warning': 'var(--color-warning)',
        'success': 'var(--color-success)',
        'light': '#ffffff',
        'dark': '#636364',
        'white': 'var(--color-white)',
        'legumes': '#B5CDA3',
        'leafy-vegetables': '#C8D5B9',
        'solanaceous-crops': '#E2B3A9',
        'root-vegetables': '#D9C3B0',
        'cereals': '#E8D8C3',
        'neutral': '#E0E0E0', // Fallback color
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        logo: 'var(--font-logo)',
      },
    },
  },
  plugins: [],
}
