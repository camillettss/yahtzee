module.exports = {
  // ... resto invariato
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 0.5s ease-in-out',
        'row-bounce': 'row-bounce 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(59 130 246 / 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgb(59 130 246 / 0)' },
        },
        'row-bounce': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.05) translateY(-2px)' },
          '100%': { transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  // ... resto
}