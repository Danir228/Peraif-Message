const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  plugins: [new Dotenv()],
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js | jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
