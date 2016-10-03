"use strict";

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// Path configs
let entryPointPath = path.resolve(__dirname, '../app/assets/javascripts/apps');

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!');
  process.exit(1);
}

var plugins = [
  // Clear output path
  new WebpackCleanupPlugin({ quiet: true }),

  // Do not allow files with errors to continue the compilation
  new webpack.NoErrorsPlugin(),

  // Extract CSS
  new ExtractTextPlugin('[name]-[hash].css', {
    allChunks: true
  }),

  // Create a manifest.json file
  new ManifestPlugin({
    fileName: 'manifest.json'
  }),

  // Set NODE_ENV to every module
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  })
];

try {
  // Adds environment-specific plugins
  fs.statSync(path.resolve(__dirname, `./webpack.${process.env.NODE_ENV}.plugins.js`)).isFile();
  plugins = plugins.concat(require(`./webpack.${process.env.NODE_ENV}.plugins.js`));
} catch (e) {}


module.exports = {
  // Entry points.
  // We should notice that new added files matching the glob won't be automatically
  // added while --watch is running. It must be restarted.
  entry: glob.sync(`${entryPointPath}/**/*.*`).reduce(function(result, entry){
    let relativeFullPath = path.relative(entryPointPath, entry);
    let removeExtRegexp = new RegExp(`${path.extname(relativeFullPath)}$`);
    let relativeBasePath = relativeFullPath.replace(removeExtRegexp, '');

    result[relativeBasePath] = entry;

    return result;
  }, {}),

  // Output
  output: {
    // This option prefixes all assets sources
    // publicPath: '/assets/',
    path: path.resolve(__dirname, "../public/assets"),
    filename: '[name]-[chunkhash].js',
    hashFunction: 'sha256',
    hashDigestLength: 64
  },

  resolve: {
    extensions: ['', '.js', '.es6', '.vue']
  },

  // Optimize the generation of SourceMaps
  // More info: https://webpack.github.io/docs/build-performance.html
  devtool: process.env.NODE_ENV == "production" ? 'source-map' : 'cheap-module-source-map',

  plugins: plugins,

  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      sass: ExtractTextPlugin.extract("css!sass")
    }
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue'
      },
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },

      // Local files
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        exclude: /node_modules/,
        loader: "file?context=app/assets&name=[path][name]-[sha256:hash:hex:64].[ext]",
      },

      // Module files
      {
        test: /node_modules\/.+\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        loader: "file?context=node_modules&name=[path][name]-[sha256:hash:hex:64].[ext]",
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css')
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
    ]
  }
};
