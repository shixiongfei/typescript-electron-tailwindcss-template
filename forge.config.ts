import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { MakerZIP } from "@electron-forge/maker-zip";
import mainConfig from "./webpack.main.config";
import preloadConfig from "./webpack.preload.config";
import rendererConfig from "./webpack.renderer.config";

export default {
  packagerConfig: {
    name: "ElectronStartup",
    icon: "./icons/favicon",
    ignore: [
      "dist",
      "src",
      "test",
      "node_modules",
      ".eslintrc.json",
      ".prettierrc.json",
      "forge.config.ts",
      "jest.config.json",
      "postcss.config.js",
      "tailwind.config.js",
      "tsconfig.json",
      "webpack.main.config.ts",
      "webpack.preload.config.ts",
      "webpack.renderer.config.ts",
      "webpack.shared.plugins.ts",
      "webpack.shared.rules.ts",
      "README.md",
    ],
  },
  rebuildConfig: {},
  makers: [new MakerZIP({}, ["darwin", "win32", "linux"])],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            name: "main_window",
            html: "./src/app/index.html",
            js: "./src/app/renderer.ts",
            preload: {
              config: preloadConfig,
              js: "./src/app/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};
