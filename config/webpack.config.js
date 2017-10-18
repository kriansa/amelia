const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const config = require('./assets.config');

// Default NODE_ENV should be 'development'
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const extractCssLoader = ExtractTextPlugin.extract({
  use: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
});

const extractSassLoader = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
});

/**
 * Returns a filename based on its basePath without its extension name
 *
 * E.g.: the *path* /var/log/myproject/file.log
 * with a *basePath* /var/log would return:
 * => myproject/file
 *
 * @param {String} path
 * @param {String} basePath
 * @return {String}
 */
const getRelativeBasePath = function getRelativeBasePath(filePath, basePath) {
  const relativeFullPath = path.relative(basePath, filePath);
  const removeExtRegexp = new RegExp(`${path.extname(relativeFullPath)}$`);
  return relativeFullPath.replace(removeExtRegexp, '');
};

/**
 * Returns all entries from the specified entrypath
 *
 * @param {String} entryPointPath
 * @return {Object}
 */
const getEntriesFromPath = function getEntriesFromPath(entryPointPath) {
  return glob.sync(`${config.appPath}/${entryPointPath}/**/*.*`)
    .reduce((result, entry) => {
      // eslint-disable-next-line no-param-reassign
      result[getRelativeBasePath(entry, `${config.appPath}/${entryPointPath}`)] = entry;

      return result;
    }, {});
};

const webpackConfig = {
  context: config.appPath,

  // Entry points
  entry: getEntriesFromPath(config.entryPointsRelativePath),

  // Output
  output: {
    path: `${config.appPath}/${config.outputRelativePath}`,
    publicPath: `${config.assetsPrefix}/`,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name].chunk-[chunkhash].js',
    hashFunction: 'sha256',
    hashDigestLength: 64,
  },

  plugins: [
    // Do not allow files with errors to continue the compilation
    new webpack.NoEmitOnErrorsPlugin(),

    // Delete old files between compiles
    new CleanObsoleteChunks({
      verbose: false,
    }),

    // Extract CSS
    new ExtractTextPlugin({
      filename: '[name]-[sha256:contenthash:hex:64].css',
      allChunks: true,
    }),

    // Create a manifest.json file
    new ManifestPlugin({
      fileName: '.manifest-webpack.json',
    }),

    // Set NODE_ENV to every module
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  module: {
    rules: [
      /**
       * Project files
       */
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            css: extractCssLoader,
            sass: extractSassLoader,
            scss: extractSassLoader,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        loader: extractSassLoader,
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          publicPath: '/assets/',
          context: 'app/assets',
          name: '[path][name]-[sha256:hash:hex:64].[ext]',
        },
      },

      /**
       * Both project and vendor CSS are handled in the same way
       */
      {
        test: /\.css$/,
        loader: extractCssLoader,
      },

      /**
       * Handling with vendor assets (node_modules)
       * They are outputted into `vendor` folder
       */
      {
        test: /node_modules\/.+\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/assets/',
          context: 'node_modules',
          name: 'vendor/[path][name]-[sha256:hash:hex:64].[ext]',
        },
      },
    ],
  },
};

try {
  // Loads environment-specific settings
  fs.statSync(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.config.js`).isFile();

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const additionalWebpackConfig = require(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.config.js`)(webpackConfig);

  // Merge settings into webpackConfig
  Object.assign(webpackConfig, additionalWebpackConfig);
} catch (e) {} // eslint-disable-line no-empty

// Return the webpack settings
module.exports = webpackConfig;
