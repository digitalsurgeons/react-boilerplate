const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    style: path.join(__dirname, 'app', 'main.css'),
    app: path.join(__dirname, 'app'),
    vendor: Object.keys(pkg.dependencies)
  },
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/ds-react-boilerplate/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      // Extract CSS during build
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
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
    new CleanWebpackPlugin([path.join(__dirname, 'build')], {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new PurifyCSSPlugin({
      basePath: process.cwd(),
      // `paths` is used to point PurifyCSS to files not
      // visible to Webpack. You can pass glob patterns
      // to it.
      paths: [
        path.join(__dirname, 'app')
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'DS React Boilerplate',
      hash: true,
      filename: 'index.html',
      template: __dirname + '/index.html',
      environment: process.env.NODE_ENV
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});