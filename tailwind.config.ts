import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1F2A44',
          deep: '#161F33',
        },
        paper: {
          DEFAULT: '#F6EEDC',
          edge: '#E4D8BE',
        },
        ink: '#2B2A26',
        orange: '#EE8635',
        green: '#3E7C4F',
        stamp: '#C9452E',
        muted: '#8B93A7',
      },
      fontFamily: {
        sans: [
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Yu Gothic',
          'Noto Sans JP',
          'sans-serif',
        ],
      },
    },
  },
} satisfies Config;
