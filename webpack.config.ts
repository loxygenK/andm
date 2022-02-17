import { Configuration } from "webpack";

const configuration: Configuration = {
  entry: "./src/main.ts",
  target: "node",
  resolve: {
    alias: {
      "~": "./"
    },
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "./main.js"
  }
};

export default configuration;
