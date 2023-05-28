import { rules } from "./webpack.shared.rules";
import { plugins } from "./webpack.shared.plugins";

export default {
  entry: {
    index: "./src/app/main.ts",
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].js",
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  target: "electron-main",
};
