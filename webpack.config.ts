import { Configuration } from "webpack";

const production = process.env.NODE_ENV === "production";

const configuration: Configuration = {
  entry: "./bin/index.ts",
  mode: production ? "production" : "development",
  target: "node",
  resolve: {
    alias: {
      "~": "/src"
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
