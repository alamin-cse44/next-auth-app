/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true, // Automatically centers the container
      padding: "2rem", // Applies padding to the container
      screens: {
        sm: "100%", // Full width on small screens
        md: "768px", // 768px width on medium screens
        lg: "1024px", // 1024px width on large screens
        xl: "1280px", // 1280px width on extra-large screens
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["ligt"],
          primary: "#FF3811",
          secondary: "#fff",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",

          ".btn-primary": {
            color: "#fff",
          },
          ".btn-outline.btn-primary:hover": {
            color: "#fff",
          },
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
