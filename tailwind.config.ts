import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    nextui(),
    daisyui
  ],
  safelist: [
    'bg-white', 'text-gray-800', 'bg-orange-100', 'border-gray-700',
    'rounded-2xl', 'shadow-lg', 'text-2xl', 'font-bold', 'p-4',
    'px-6', 'py-2', 'overflow-hidden', 'transition-colors', 'duration-300'
  ]
} satisfies Config;