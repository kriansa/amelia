const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function appendConfig(webpackConfig) {
  return {
    plugins: webpackConfig.plugins.concat([
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(css|js|jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true,
          screw_ie8: true,
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ]),

    // Source-map suitable for production
    devtool: 'source-map',
  };
};
