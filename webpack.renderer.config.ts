import { rules } from "./webpack.shared.rules";
import { plugins } from "./webpack.shared.plugins";

export default {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  target: "electron-renderer",
};
