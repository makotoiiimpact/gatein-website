import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        gatein: {
          blue: '#2563EB',
          navy: '#0A1628',
          slate: '#64748B',
          light: '#F8FAFC',
          accent: '#3B82F6',
          coral: '#FF6B6B',
        },
      },
    },
  },
  plugins: [],
}

export default config
