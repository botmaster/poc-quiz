/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const defaultColors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'white': 'hsl(var(--color-white) / <alpha-value>)',
      'black': 'hsl(var(--color-black) / <alpha-value>)',
      'primary': 'hsl(var(--color-primary) / <alpha-value>)',
      'primary-content': 'hsl(var(--color-primary-content) / <alpha-value>)',
      'secondary': 'hsl(var(--color-secondary) / <alpha-value>)',
      'secondary-content': 'hsl(var(--color-secondary-content) / <alpha-value>)',
      'accent': 'hsl(var(--color-accent) / <alpha-value>)',
      'accent-content': 'hsl(var(--color-accent-content) / <alpha-value>)',
      'neutral': 'hsl(var(--color-neutral) / <alpha-value>)',
      'neutral-content': 'hsl(var(--color-neutral-content) / <alpha-value>)',
      'warning': 'hsl(var(--color-warning) / <alpha-value>)',
      'warning-content': 'hsl(var(--color-warning-content) / <alpha-value>)',
      'success': 'hsl(var(--color-success) / <alpha-value>)',
      'success-content': 'hsl(var(--color-success-content) / <alpha-value>)',
      'danger': 'hsl(var(--color-danger) / <alpha-value>)',
      'danger-content': 'hsl(var(--color-danger-content) / <alpha-value>)',
      'info': 'hsl(var(--color-info) / <alpha-value>)',
      'info-content': 'hsl(var(--color-info-content) / <alpha-value>)',

      // Add gray fallbacks
      'gray': ((theme) => {
        const gray = { ...theme.gray };
        const objectKeys = Object.keys(gray);
        objectKeys.forEach((key) => {
          gray[key] = `hsl(var(--color-gray-${key}) / <alpha-value>)`;
        });
        return gray;
      })(defaultColors),

      'body': {
        background: 'var(--color-body-background-hex)',
        text: 'var(--color-body-text-hex)',
      },
      'muted': {
        text: 'var(--color-muted-text-hex)',
      },
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      display: 'var(--font-family-display)',
      body: 'var(--font-family-body)',

    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      dropShadow: {
        '3xl': '20px 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
        'phone-frame': '0px 30px 35px rgba(0, 0, 0, 0.25)',
      },
    },
    container: theme => ({
      center: true,
      padding: {
        DEFAULT: theme('spacing.4'),
        sm: theme('spacing.6'),
        lg: theme('spacing.8'),
      },
    }),
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')({
    strategy: 'class',
  })],
  /* safelist: [ {
    pattern: /^(bg|text)-/, // Whitelist bg- and text- utilities for design system.
  } ], */
};
