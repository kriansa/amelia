let webpack = require('webpack');
let path = require('path');
let CompressionPlugin = require("compression-webpack-plugin");

module.exports = [
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.(css|js|jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: true,
      drop_debugger: true
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];
