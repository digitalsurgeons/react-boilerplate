const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');

const config = {
  devtool: 'eval-source-map',
  entry: {
    'app': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'app'),
    ],
    style: [
      path.join(__dirname, 'app', 'main.css'),
      'webpack/hot/only-dev-server'
    ],
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.join(__dirname, 'app', 'main.css')
      },
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: path.join(__dirname, 'app')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new HtmlWebpackPlugin({
      title: 'DS React Boilerplate',
      hash: true,
      filename: 'index.html',
      template: 'index.html',
      environment: process.env.NODE_ENV
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});
