let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let glob = require('glob');
let ManifestPlugin = require('webpack-manifest-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

// Path settings
let appPath = path.resolve(__dirname, '..');
let assetsRelativePath = 'app/assets';
let entryPointPath = `${appPath}/${assetsRelativePath}/javascripts/actions`;
let outputPath = `${appPath}/public/assets`;

if (!process.env.NODE_ENV) {
  console.error('NODE_ENV variable is not set!');
  process.exit(1);
}

let plugins = [
  // Delete output path
  new CleanWebpackPlugin([path.relative(appPath, outputPath)], {
    root: appPath,
    verbose: true,
  }),

  new StyleLintPlugin({
    configFile: `${appPath}/.stylelintrc.yml`,
    files: ['**/*.s?(a|c)ss'],
    context: `${appPath}/${assetsRelativePath}`,
    syntax: 'scss',
    failOnError: process.env.NODE_ENV === 'production'
  }),

  new StyleLintPlugin({
    configFile: `${appPath}/.stylelintrc.yml`,
    files: ['**/*.vue'],
    context: `${appPath}/${assetsRelativePath}`,
    syntax: 'scss',
    configOverrides: {
      processors: ["stylelint-processor-arbitrary-tags"]
    },
    failOnError: process.env.NODE_ENV === 'production'
  }),

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
module.exports = {
  // Entry point (non-webpack setting)
  entryPointPath: entryPointPath,

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
    path: outputPath,
    filename: '[name]-[chunkhash].js',
    hashFunction: 'sha256',
    hashDigestLength: 64
  },

  resolve: {
    extensions: ['', '.js', '.es6', '.vue']
  },

  // Optimize the generation of SourceMaps
  // More info: https://webpack.github.io/docs/build-performance.html
  devtool: process.env.NODE_ENV == 'production' ? 'source-map' : 'cheap-module-source-map',

  plugins: plugins,

  vue: {
    loaders: {
      js: 'babel',
      css: ExtractTextPlugin.extract("css?sourceMap"),
      sass: ExtractTextPlugin.extract("css!sass?sourceMap"),
      scss: ExtractTextPlugin.extract("css!sass?sourceMap")
    }
  },

  // options for sass-loader
  sassLoader: {
    includePaths: [require('bourbon-neat').includePaths, require('bourbon').includePaths]
  },

  module: {
    loaders: [
      // Local JS files
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue!eslint'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel!eslint',
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
        loader: ExtractTextPlugin.extract('css?sourceMap')
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract('css!sass?sourceMap')
      },
    ]
  }
};
