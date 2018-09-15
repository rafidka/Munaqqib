import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

export default (env: any): webpack.Configuration => {
  if (!env || !env.NODE_ENV) {
    throw new Error("NODE_ENV environment variable is not set.");
  }
  console.log("webpack.server.ts is running with NODE_ENV = " + env.NODE_ENV);

  return {
    devtool: "inline-source-map",
    entry: {
      server: "./src/server/server.ts",
      daemon: "./src/daemon/daemon.ts"
    },
    externals: [
      // Exclude node_modules from the bundle.
      // TODO: Ideally, we should not exclude them, but it is causing problems
      // with "require" statements that use expressions causing webpack to not be
      // able to find the module at build time.
      nodeExternals()
    ],
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
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    target: "node"
  };
}
