/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6A00",
          orangeGlow: "rgba(255, 106, 0, 0.4)",
          black: "#050505",
          dark: "#0b0b0b",
          gray: "#161616",
          lightGray: "#2a2a2a",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(255, 106, 0, 0.2), 0 0 20px rgba(255, 106, 0, 0.1)" },
          "100%": { boxShadow: "0 0 25px rgba(255, 106, 0, 0.6), 0 0 45px rgba(255, 106, 0, 0.3)" },
        }
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, rgba(255, 106, 0, 0.15) 0%, transparent 70%)",
        "dark-gradient": "linear-gradient(to bottom, #050505, #0a0a0a, #050505)",
      }
    },
  },
  plugins: [],
}
