const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');

const config = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'app')
    ],
    vendor: [
      'react'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      // Load LESS
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      // Load SCSS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:5]!postcss-loader'
        )
      },
      // Load plain-ol' vanilla CSS
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
    }),
    new Visualizer(),
    new ExtractTextPlugin('[name].[chunkhash].css', { allChunks: false })
  ],
  resolve: {
    root: path.join(__dirname, 'app')
  }
};

module.exports = validate(config, {
  rules: {
    // this checks that files/folders that are found in directories specified
    // via webpacks resolve.root option do not nameclash with node_modules
    // packages.
    'no-root-files-node-modules-nameclash': false,
  },
  // Run validator in quiet mode to avoid output in stats
  quiet: true
});
