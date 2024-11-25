/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/stories/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
          100: "hsl(var(--foreground-100) / <alpha-value>)",
          200: "hsl(var(--foreground-200) / <alpha-value>)",
        },
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
        },
        default: {
          DEFAULT: "hsl(var(--default) / <alpha-value>)",
          light: "hsl(var(--default-light) / <alpha-value>)",
          border: "hsl(var(--default-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          light: "hsl(var(--primary-light) / <alpha-value>)",
          dark: "hsl(var(--primary-dark) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          light: "hsl(var(--accent-light) / <alpha-value>)",
          dark: "hsl(var(--accent-dark) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
        },
      },
      boxShadow: {
        accent: "0px 0px 12px -4px var(--accent)",
        popup: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
