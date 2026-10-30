/** @type {import('tailwindcss').Config} */
// COLOR.M 브랜드(colorm.net) 기준 테마: 블랙·화이트·그레이 + 마젠타 포인트
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans KR"', 'system-ui', 'sans-serif'],
        display: ['"Gothic A1"', '"IBM Plex Sans KR"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"IBM Plex Sans KR"', 'monospace'],
      },
      colors: {
        canvas: '#F3F4F6',
        card: '#FFFFFF',
        border: '#E5E7EB',
        ink: {
          DEFAULT: '#171512',
          sub: '#6B6660',
        },
        magenta: {
          DEFAULT: '#FF2D86',
          soft: '#FFB3D1',
          deep: '#E0156C',
        },
        // 보조 톤(라벨·아이콘): 브랜드의 무채색 계열
        tone: {
          DEFAULT: '#8A857E',
          soft: '#E7E5E2',
          deep: '#171512',
        },
        season: {
          spring: '#F4D94E',
          summer: '#78B8D8',
          autumn: '#D3A04A',
          winter: '#315F9D',
        },
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 4px 20px -8px rgba(23, 21, 18, 0.16)',
        card: '0 6px 24px -10px rgba(23, 21, 18, 0.18)',
        selected: '0 0 0 3px rgba(255, 45, 134, 0.15), 0 8px 24px -10px rgba(255, 45, 134, 0.3)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.45s ease-out',
        'scale-in': 'scale-in 0.35s ease-out',
        'slide-in': 'slide-in 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
