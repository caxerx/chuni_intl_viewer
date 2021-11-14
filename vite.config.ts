import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocessor from "svelte-preprocess";
import { windi } from "svelte-windicss-preprocess";
import WindiCSS from "vite-plugin-windicss";
import libInjectCss from "./libInjectCss";

export default defineConfig({
  build: {
    outDir: "./",
    lib: {
      entry: "src/main.ts",
      formats: ["iife"],
      fileName: () => "main.min.js",
      name: "chuni_intl_viewer",
    },
  },
  plugins: [
    WindiCSS(),
    svelte({
      preprocess: [
        // windi({
        //   configPath: "tailwind.config.js",
        // }),
        sveltePreprocessor({
          sourceMap: true,
        }),
      ],
      extensions: [".svelte"],
      emitCss: false,
    }),
    libInjectCss(),
  ],
});
