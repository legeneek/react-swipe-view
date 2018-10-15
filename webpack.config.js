const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "example/src/index.html"),
  filename: "./index.html"
})

module.exports = {
  entry: path.join(__dirname, "example/src/index.js"),
  output: {
    path: path.join(__dirname, "example/dist"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  serve: {
    port: 3000
  }
};
