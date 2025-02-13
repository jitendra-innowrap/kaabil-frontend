import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans], // Poppins as default
        kalam: ['var(--font-kalam)', 'cursive'], // Kalam as secondary
      },
      colors: {
        black:"#231F20",
        red:"#E31836",
        yellow:"#FBCB77",
        success:"#53C690",
        bg:"#FEF5E4",
        lightGrey:"#E6E7E8",
        Grey:"#4D4D4F",
        greyText: "#BFBFC0"

      },
      animation: {
        "infinite-slider": "infiniteSlider 20s linear infinite",
        "infinite-slider-reverse": "infiniteSliderReverse 20s linear infinite",
      },
      boxShadow:{
        default: "0px 4px 22px 0px #00000029",
        secondary: "0px 0px 17px -3px #bdbdbd",
        tertiary: "0px 12px 32px 0px #CFDAEC4D",


      },
      keyframes: {
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 5))" }, // Adjust based on your item width
        },
        infiniteSliderReverse: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(250px * 5))" }, // Adjust based on your item width
        },
      },
    },
  },
  plugins: [],
};
export default config;
