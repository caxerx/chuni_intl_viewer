const path = require("path");
const { rollup } = require("rollup");
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const { terser } = require("rollup-plugin-terser");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const svelte = require("rollup-plugin-svelte");
const sveltePreprocessor = require("svelte-preprocess");
const windi = require("svelte-windicss-preprocess").windi;

console.log("Compiling...");

const build = async () => {
  const bundle = await rollup({
    input: path.join(__dirname, "src/main.ts"),
    plugins: [
      typescript(),
      nodeResolve(),
      terser(),
      commonjs(),
      svelte({
        preprocess: [sveltePreprocessor(), windi()],
        extensions: [".svelte"],
        emitCss: false,
      }),
    ],
  });

  await bundle.write({
    sourcemap: true,
    file: path.join(__dirname, "main.min.js"),
    format: "iife",
  });
};

build().then(() => {
  console.log("Finished");
});
