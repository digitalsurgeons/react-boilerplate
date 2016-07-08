const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');

const settings = {
  host: 'localhost',
  port: 3000
};

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true
}).listen(settings.port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://' + settings.host + ':' + settings.port);
});
