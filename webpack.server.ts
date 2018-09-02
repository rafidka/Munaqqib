import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const config: webpack.Configuration = {
  devtool: "inline-source-map",
  entry: "./src/server/server.ts",
  externals: [
    // Exclude node_modules from the bundle.
    // TODO: Ideally, we should not exclude them, but it is causing problems
    // with "require" statements that use expressions causing webpack to not be
    // able to find the module at build time.
    nodeExternals()
  ],
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
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node"
};

export default config;

