// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },

      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
      },

      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        "text-gradient": "text-gradient 5s ease infinite",
      },
    },
    screens: {
      sm: "480px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwind-scrollbar-hide"),
  ],
};
