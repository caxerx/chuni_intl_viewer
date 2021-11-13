module.exports = {
  jit: true,
  purge: ["./src/**/*.svelte"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        dark: "0 10px 15px -3px rgba(128, 128, 128, 0.1), 0 4px 6px -2px rgba(128, 128, 128, 0.05)",
        "dark-sm": "0 1px 2px 0 rgba(128, 128, 128, 0.05)",
        "dark-xl":
          "0 20px 25px -5px rgba(128, 128, 128, 0.1), 0 10px 10px -5px rgba(128, 128, 128, 0.04)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["dark"],
    },
  },
};
