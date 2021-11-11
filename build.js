const path = require("path");
const { rollup } = require("rollup");
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const svelte = require("rollup-plugin-svelte");
const sveltePreprocessor = require("svelte-preprocess");

console.log("Compiling...");

const build = async () => {
  const bundle = await rollup({
    input: path.join(__dirname, "src/main.ts"),
    plugins: [
      typescript(),
      nodeResolve(),
      terser(),
      json(),
      commonjs(),
      svelte({
        preprocess: sveltePreprocessor(),
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
