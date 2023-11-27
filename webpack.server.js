const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server/www.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('bin'),
    filename: 'www.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      }
    ]
  }
}
