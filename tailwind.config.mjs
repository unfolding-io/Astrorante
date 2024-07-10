const plugin = require("tailwindcss/plugin");
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        /* https://modernfontstacks.com/ */
        "system-ui": ["system-ui", "sans-serif"],
        didone: [
          "Didot",
          "'Bodoni MT'",
          "'Noto Serif Display'",
          "'URW Palladio L'",
          "P052",
          "Sylfaen",
          "serif",
        ],
        antique: [
          "Superclarendon",
          "'Bookman Old Style'",
          "'URW Bookman'",
          "'URW Bookman L'",
          "'Georgia Pro'",
          "Georgia",
          "serif",
        ],
        "slab-serif": [
          "Rockwell",
          "'Rockwell Nova'",
          "'Roboto Slab'",
          "'DejaVu Serif'",
          "'Sitka Small'",
          "serif",
        ],
        "neo-grotesque": [
          "Inter",
          "Roboto",
          "'Helvetica Neue'",
          "'Arial Nova'",
          "'Nimbus Sans'",
          "Arial",
          "sans-serif",
        ],
        transitional: [
          "Charter",
          "'Bitstream Charter'",
          "'Sitka Text'",
          "Cambria",
          "serif",
        ],
        "old-style": [
          "'Iowan Old Style'",
          "'Palatino Linotype'",
          "'URW Palladio L'",
          "P052",
          "serif",
        ],
        "geometric-humanist": [
          "Avenir",
          "Montserrat",
          "Corbel",
          "'URW Gothic'",
          "source-sans-pro",
          "sans-serif",
        ],
        "classical-humanist": [
          "Optima",
          "Candara",
          "'Noto Sans'",
          "source-sans-pro",
          "sans-serif",
        ],
        humanist: [
          "Seravek",
          "'Gill Sans Nova'",
          "Ubuntu",
          "Calibri",
          "'DejaVu Sans'",
          "source-sans-pro",
          "sans-serif",
        ],
        "monospace-slab-serif": [
          "'Nimbus Mono PS'",
          "'Courier New'",
          "monospace",
        ],
        "monospace-code": [
          "ui-monospace",
          "'Cascadia Code'",
          "'Source Code Pro'",
          "Menlo",
          "Consolas",
          "'DejaVu Sans Mono'",
          "monospace",
        ],
        industrial: [
          "Bahnschrift",
          "'DIN Alternate'",
          "'Franklin Gothic Medium'",
          "'Nimbus Sans Narrow'",
          "sans-serif-condensed",
          "sans-serif",
        ],
        "rounded-sans": [
          "ui-rounded",
          "'Hiragino Maru Gothic ProN'",
          "Quicksand",
          "Comfortaa",
          "Manjari",
          "'Arial Rounded MT'",
          "'Arial Rounded MT Bold'",
          "Calibri",
          "source-sans-pro",
          "sans-serif",
        ],
        handwritten: [
          "'Segoe Print'",
          "'Bradley Hand'",
          "Chilanka",
          "TSCu_Comic",
          "casual",
          "cursive",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "rgb(var(--primary-bg) / <alpha-value>)",
          foreground: "rgb(var(--primary-fg) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-bg) / <alpha-value>)",
          foreground: "rgb(var(--secondary-fg) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning-bg) / <alpha-value>)",
          foreground: "rgb(var(--warning-fg) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger-bg) / <alpha-value>)",
          foreground: "rgb(var(--danger-fg) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success-bg) / <alpha-value>)",
          foreground: "rgb(var(--success-fg) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-bg) / <alpha-value>)",
          foreground: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        dark: {
          DEFAULT: "rgb(var(--dark-bg) / <alpha-value>)",
          foreground: "rgb(var(--dark-fg) / <alpha-value>)",
        },
        light: {
          DEFAULT: "rgb(var(--light-bg) / <alpha-value>)",
          foreground: "rgb(var(--light-fg) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info-bg) / <alpha-value>)",
          foreground: "rgb(var(--info-fg) / <alpha-value>)",
        },

        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
        },

        popover: {
          DEFAULT: "rgb(var(--accent-bg) / <alpha-value>)",
          foreground: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--light-bg) / <alpha-value>)",
          foreground: "rgb(var(--light-fg) / <alpha-value>)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  savelist: [
    "opacity-10",
    "opacity-20",
    "opacity-30",
    "opacity-40",
    "opacity-50",
    "opacity-60",
    "opacity-70",
    "opacity-80",
    "opacity-90",
    "opacity-100",
    "font-system-ui",
    "font-neo-grotesque",
    "font-humanist",
    "font-classical-humanist",
    "font-geometric-humanist",
    "font-transitional",
    "font-old-style",
    "font-slab-serif",
    "font-antique",
    "font-didone",
    "font-industrial",
    "font-rounded-sans",
    "font-monospace-code",
    "font-monospace-slab-serif",
    "font-handwritten",
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
    "text-left",
    "text-right",
    "text-center",
  ],
  plugins: [
    animate,
    require("@tailwindcss/container-queries"),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "18px" },
      });
    }),
  ],
};
