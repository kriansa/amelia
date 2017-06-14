const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv');
const config = require('./assets.config');

// Load .env settings
const parsedEnv = (function loadDotEnvFile() {
  const fileString = fs.readFileSync(`${config.appPath}/.env`, { encoding: 'utf-8' });
  // Ensure that it works with `export` suffix on variables
  const parsedObj = Dotenv.parse(fileString.replace(/export\s+/g, ''));

  return Object.entries(parsedObj)
    .map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)])
    // eslint-disable-next-line no-param-reassign
    .reduce((obj, [k, v]) => { obj[k] = v; return obj; }, {})
  ;
}());

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!'); // eslint-disable-line no-console
  process.exit(1);
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
        includePaths: config.sassIncludePaths,
      },
    },
  ],
});

let plugins = [
  // Do not allow files with errors to continue the compilation
  new webpack.NoEmitOnErrorsPlugin(),

  // Extract CSS
  new ExtractTextPlugin({
    filename: '[name]-[sha256:contenthash:hex:64].css',
    allChunks: true,
  }),

  // Create a manifest.json file
  new ManifestPlugin({
    fileName: 'manifest.json',
  }),

  // Resolve libraries at compile time for components that depends on libraries
  // that are not explicitely set as a dependency. Most likely, it will be for
  // those libraries that expect jQuery or some other plugin to be required in
  // the browser before it gets loaded.
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Tether: 'tether',
    'window.jQuery': 'jquery',
    'window.Tether': 'tether',
  }),

  // Set NODE_ENV to every module
  new webpack.DefinePlugin(Object.assign(parsedEnv, {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  })),

  // Keep legacy support to plugins built for Webpack 1
  new webpack.LoaderOptionsPlugin({
    options: {
      context: config.appPath,
    },
  }),
];

try {
  // Adds environment-specific plugins
  fs.statSync(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`).isFile();
  // eslint-disable-next-line global-require, import/no-dynamic-require
  plugins = plugins.concat(require(`${config.appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`));
} catch (e) {} // eslint-disable-line no-empty

// Optimize the generation of SourceMaps
// More info: https://webpack.github.io/docs/build-performance.html
let devtool;
if (process.env.NODE_ENV === 'production') {
  devtool = 'source-map';
} else if (process.env.NODE_ENV === 'test') {
  devtool = 'inline-source-map';
} else {
  devtool = 'cheap-module-source-map';
}

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

module.exports = {
  context: config.appPath,

  // Entry points
  entry: getEntriesFromPath(config.entryPointsRelativePath),

  // Output
  output: {
    path: `${config.appPath}/${config.outputRelativePath}`,
    filename: '[name]-[chunkhash].js',
    hashFunction: 'sha256',
    hashDigestLength: 64,
  },

  performance: {
    maxEntrypointSize: 400000,
  },

  devtool,

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
