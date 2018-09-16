import path from "path";
import webpack from "webpack";

export default (env: any): webpack.Configuration => {
  if (!env || !env.NODE_ENV) {
    throw new Error("NODE_ENV environment variable is not set.");
  }
  console.log("webpack.client.ts is running with NODE_ENV = " + env.NODE_ENV);

  return {
    devtool: "source-map",
    entry: "./src/server/public/js/index.ts",
    mode: env.NODE_ENV == "production" ? "production" : "development",
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
      path: env.NODE_ENV == "production"
        ? path.resolve(__dirname, "./dist/public/js")
        : path.resolve(__dirname, "./src/server/public/js")
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    target: "node"
  };
};

