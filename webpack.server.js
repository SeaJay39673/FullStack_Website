const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/server.js",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: path.resolve("build-server"),
    filename: "index.js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/preset-react'] },
      },
    ]
  }
};