const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Bourbon = require('bourbon');
const BourbonNeat = require('bourbon-neat');
const config = require('./assets.config');

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!'); // eslint-disable-line no-console
  process.exit(1);
}

const extractCssLoader = ExtractTextPlugin.extract({
  loader: {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
});

const extractSassLoader = ExtractTextPlugin.extract({
  loader: [
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

let plugins = [
  // Clean files not created by the current build
  new WebpackCleanupPlugin({ quiet: true }),

  // Do not allow files with errors to continue the compilation
  new webpack.NoErrorsPlugin(),

  // Extract CSS
  new ExtractTextPlugin({
    filename: '[name]-[sha256:contenthash:hex:64].css',
    allChunks: true,
  }),

  // Create a manifest.json file
  new ManifestPlugin({
    fileName: 'manifest.json',
  }),

  // Set NODE_ENV to every module
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),

  new webpack.LoaderOptionsPlugin({
    options: {
      sassLoader: {
        includePaths: [
          `${config.appPath}/${config.stylesheetsRelativePath}`,
          ...BourbonNeat.includePaths,
          ...Bourbon.includePaths,
        ],
      },
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
  context: config.appPath,

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
    extensions: ['.js'],
  },

  performance: {
    maxEntrypointSize: 400000,
  },

  // Optimize the generation of SourceMaps
  // More info: https://webpack.github.io/docs/build-performance.html
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',

  plugins,

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
       * They are outputted into `_vendor` folder
       */
      {
        test: /node_modules\/.+\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          context: 'node_modules',
          name: '_vendor/[path][name]-[sha256:hash:hex:64].[ext]',
        },
      },
    ],
  },
};
