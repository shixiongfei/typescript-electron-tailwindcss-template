import { BytenodeWebpackPlugin } from "@herberttn/bytenode-webpack-plugin";

const bytenodePlugin =
  process.env.ELECTRON_ENV === "development"
    ? []
    : [new BytenodeWebpackPlugin({ compileForElectron: true })];

export const plugins = [...bytenodePlugin];
