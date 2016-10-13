let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let glob = require('glob');
let ManifestPlugin = require('webpack-manifest-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// Path settings
let appPath = path.resolve(__dirname, '..');
let entryPointPath = `${appPath}/app/assets/javascripts/actions`;

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!');
  process.exit(1);
}

let plugins = [
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
  fs.statSync(`${appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`).isFile();
  plugins = plugins.concat(require(`${appPath}/config/webpack.${process.env.NODE_ENV}.plugins.js`));
} catch (e) {}

// Exporting time!
module.exports.entryPointPath = entryPointPath;
module.exports.webpack = {
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
    path: `${appPath}/public/assets`,
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
      sass: ExtractTextPlugin.extract("css!sass"),
      scss: ExtractTextPlugin.extract("css!sass")
    }
  },

  // more options in the optional jshint object
  // Add any jshint option (http://www.jshint.com/docs/options) to .jshintrc
  jshint: {
    // jshint interrupt the compilation
    failOnHint: true,
  },

  // options for sass-loader
  sassLoader: {
    includePaths: [require("bourbon-neat").includePaths, require("bourbon").includePaths]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ],
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
