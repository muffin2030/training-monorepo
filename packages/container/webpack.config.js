const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "container.js",
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 8000,
    hot: true,
    liveReload: false,
    historyApiFallback: { disableDotRule: true, index: "/" },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3001",
      },
    ],
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
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        frontendApp: "frontendApp@http://localhost:3000/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
