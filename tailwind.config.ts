import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl': '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
        'serch': '0px 5px 8px 2px rgba(34, 60, 80, 0.12)',
      }
    },
  },
  plugins: [],
}
export default config
