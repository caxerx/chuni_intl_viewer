import fs from "fs";
import { resolve } from "path";
import type { ResolvedConfig, PluginOption } from "vite";

const fileRegex = /\.(css)$/;

const injectCode = (code: string) => `styleInject(${code})`;
const template = `console.warn("__INJECT__")`;

let viteConfig: ResolvedConfig;
const css: string[] = [];

export default function libInjectCss(): PluginOption {
  return {
    name: "lib-inject-css",

    apply: "build",

    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },

    transform(code: string, id: string) {
      if (fileRegex.test(id)) {
        css.push(code);
        return {
          code: "",
        };
      }
      if (
        // @ts-ignore
        id.includes(viteConfig.build.lib.entry)
      ) {
        return {
          code: `${code}
          ${template}`,
        };
      }
      return null;
    },

    async writeBundle(_: any, bundle: any) {
      for (const file of Object.entries(bundle)) {
        const { root } = viteConfig;
        const outDir: string = viteConfig.build.outDir || "dist";
        const fileName: string = file[0];
        const filePath: string = resolve(root, outDir, fileName);

        try {
          let data: string = fs.readFileSync(filePath, {
            encoding: "utf8",
          });

          if (data.includes(template)) {
            data = data.replace(
              template,
              injectCode(JSON.stringify(css.join("\n")))
            );
          }

          fs.writeFileSync(filePath, data);
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
