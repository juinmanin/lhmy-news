/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 소식지 기본 색상 팔레트
        paper: '#F5F0E8',
        ink: '#2C1810',
        gold: '#C4A35A',
        cream: '#EDE8DC',
        darkbrown: '#1a0e08',
      },
      fontFamily: {
        // 한국어 명조체 계열
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        // 한국어 고딕 계열
        sans: ['"Noto Sans KR"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
