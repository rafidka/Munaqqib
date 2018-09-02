import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  devtool: "source-map",
  entry: "./src/server/public/js/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    setImmediate: false
  },
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "./src/server/public/js")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node"
};

export default config;

