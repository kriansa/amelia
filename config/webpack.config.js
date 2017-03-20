const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
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
        includePaths: [
          `${config.appPath}/${config.stylesheetsRelativePath}`,
          ...config.sassIncludePaths,
        ],
      },
    },
  ],
});

let plugins = [
  // Clean files not created by the current build
  new WebpackCleanupPlugin({ quiet: true }),

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
