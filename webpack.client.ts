import path from "path";
import webpack from "webpack";

export default (env: any): webpack.Configuration => {
  if (!env || !env.NODE_ENV) {
    throw new Error("NODE_ENV environment variable is not set.");
  }
  console.log("webpack.client.ts is running with NODE_ENV = " + env.NODE_ENV);

  return {
    devtool: "source-map",
    entry: "./src/server/public/js/index.tsx",
    mode: env.NODE_ENV == "production" ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [/node_modules/]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    output: {
      filename: "client.js",
      path:
        env.NODE_ENV == "production"
          ? path.resolve(__dirname, "./dist/public/js")
          : path.resolve(__dirname, "./src/server/public/js")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    }
  };
};
