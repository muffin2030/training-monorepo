const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const stylesHandler = "style-loader";
const isProduction = process.env.NODE_ENV === "production";
const { ModuleFederationPlugin } = require("webpack").container;

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "frontend.js",
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 3000,
    hot: true,
    liveReload: false,
    historyApiFallback: { disableDotRule: true, index: "/" },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
    client: {
      overlay: true,
    },
    static: {
      staticOptions: {
        redirect: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new ModuleFederationPlugin({
      name: "frontendApp",
      filename: "remoteEntry.js",
      exposes: {
        "./MF_frontendApp": "./src/bootstrap",
      },
    }),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        use: [
          "babel-loader",
          "@wyw-in-js/webpack-loader",
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      "@app/*": path.resolve(__dirname, "./src"),
      "@root/*": path.resolve(__dirname, "."),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
