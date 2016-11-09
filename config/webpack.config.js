const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const config = require('./assets.config');
const Bourbon = require('bourbon');
const BourbonNeat = require('bourbon-neat');

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!'); // eslint-disable-line no-console
  process.exit(1);
}

let plugins = [
  // Clean files not created by the current build
  new WebpackCleanupPlugin({ quiet: true }),

  // Do not allow files with errors to continue the compilation
  new webpack.NoErrorsPlugin(),

  // Extract CSS
  new ExtractTextPlugin('[name]-[hash].css', {
    allChunks: true,
  }),

  // Create a manifest.json file
  new ManifestPlugin({
    fileName: 'manifest.json',
  }),

  // Set NODE_ENV to every module
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `'${process.env.NODE_ENV}'`,
    },
  }),
];

try {
  // Adds environment-specific plugins
  fs.statSync(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`).isFile();
  // eslint-disable-next-line global-require, import/no-dynamic-require
  plugins = plugins.concat(require(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`));
} catch (e) {} // eslint-disable-line no-empty

module.exports = {
  // Entry points
  entry: glob.sync(`${config.appPath}/${config.entryPointsRelativePath}/**/*.*`)
    .reduce((result, entry) => {
      const relativeFullPath = path.relative(`${config.appPath}/${config.entryPointsRelativePath}`, entry);
      const removeExtRegexp = new RegExp(`${path.extname(relativeFullPath)}$`);
      const relativeBasePath = relativeFullPath.replace(removeExtRegexp, '');

      result[relativeBasePath] = entry; // eslint-disable-line no-param-reassign

      return result;
    }, {}),

  // Output
  output: {
    path: `${config.appPath}/${config.outputRelativePath}`,
    filename: '[name]-[chunkhash].js',
    hashFunction: 'sha256',
    hashDigestLength: 64,
  },

  resolve: {
    extensions: ['', '.js', '.vue'],
  },

  // Optimize the generation of SourceMaps
  // More info: https://webpack.github.io/docs/build-performance.html
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',

  plugins,

  vue: {
    loaders: {
      js: 'babel',
      css: ExtractTextPlugin.extract('css?sourceMap'),
      sass: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      scss: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
    },
  },

  // options for sass-loader
  sassLoader: {
    includePaths: [BourbonNeat.includePaths, Bourbon.includePaths],
  },

  module: {
    loaders: [
      // Local JS files
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },

      // Local image files
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'file?context=app/assets&name=[path][name]-[sha256:hash:hex:64].[ext]',
      },

      // Module image files
      {
        test: /node_modules\/.+\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        loader: 'file?context=node_modules&name=[path][name]-[sha256:hash:hex:64].[ext]',
      },

      // Local CSS files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap'),
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      },
    ],
  },
};
