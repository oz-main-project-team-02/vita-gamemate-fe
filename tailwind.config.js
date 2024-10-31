/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD800", // 대표 컬러
        primaryText: "#190904", // 대표 텍스트 컬러
        primaryTextLight: "#190904B3", // 대표 텍스트 컬러

        gray: {
          100: "#F9F9F9", // 아주 연한 회색
          200: "#CCCCCC", // 중간 회색
          300: "#BEBEBE", // 부드러운 회색
          400: "#757272", // 짙은 회색
          500: "#262626", // 짙은 검정색
        },

        error: "#FF1313", // 밝은 빨간색
        softPink: "#FEE8E8", // 부드러운 핑크색
        skyGray: "#EFF5F8", // 하늘빛 회색
        limeGreen: "#D5FFB7", // 라임 그린
        paleGreen: "#E5EAB6", // 창백한 녹색
        brightPink: "#FF70A2", // 밝은 핑크색
        softYellow: "#FFF6B9", // 부드러운 노란색
        purple: "#811AF6", // 보라색
        mintGreen: "#16D6B5", // 민트 그린색
        deepYellow: "#F4CE14", // 진한 노란색
        lightSkyGray: "#F7FAFC", // 아주 연한 하늘색  
      },

      fontFamily: {
        pretendard: ["pretendard Variable", "sans-serif"],
      },

      fontSize: {
        xs: "12px", // 작은 텍스트
        sm: "14px", // 일반 작은 텍스트
        base: "16px", // 기본 텍스트 크기
        lg: "18px", // 약간 큰 텍스트
        xl: "20px", // 큰 텍스트
        "2xl": "24px", // 더 큰 텍스트
        "3xl": "30px", // 제목이나 강조할 때
        "4xl": "36px", // 큰 제목
        "5xl": "48px", // 메인 타이틀 크기
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      borderRadius: {
        'chat-me': "16px 0 16px 16px",
        'chat-other': "0 16px 16px 16px",
      }
    },
  },
  plugins: [],
};
