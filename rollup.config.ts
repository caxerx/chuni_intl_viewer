import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import { defineConfig } from "rollup";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

import path from "path";

export default defineConfig({
  input: path.join(__dirname, "src/main.ts"),
  output: {
    sourcemap: false,
    file: path.join(__dirname, "main.min.js"),
    format: "iife",
  },
  plugins: [
    nodeResolve(),
    terser(),
    commonjs({ include: "node_modules/**", extensions: [".js", ".ts"] }),
    svelte({
      preprocess: [
        sveltePreprocessor({
          sourceMap: true,
          postcss: {
            plugins: [tailwindcss, autoprefixer()],
          },
        }),
      ],
      extensions: [".svelte"],
      emitCss: false,
    }),
    typescript({ sourceMap: false }),
  ],
});
