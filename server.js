const express = require('express');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const webpack = require('webpack');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only'
  }).listen(port, 'localhost', (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    return result;
  });
} else {
  app.use(express.static(__dirname + '/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
  app.listen(port, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  });
}
