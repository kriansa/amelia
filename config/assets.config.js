const path = require('path');

// Application base path (Rails.root)
const appPath = path.resolve(__dirname, '..');

module.exports = {
  /**
   * The base path of the application. Usually, Rails.root or wherever you want
   * to store your frontend application source code
   */
  appPath,

  /**
   * The path where you keep the entry points for the application
   */
  entryPointsRelativePath: 'app/assets/javascripts/actions',

  /**
   * The output path (where the frontend scripts will be compiled to)
   */
  outputRelativePath: 'public/assets',

  /**
   * This path represents the basepath in which Webpack will try to make
   * requests when using lazy imports.  Ideally, it should be the same value of
   * Rails's`config.relative_url_root` and `config.webpack.assets_prefix`
   *
   * In some cases, you may want to serve the assets from a CDN. In that case,
   * you may set this variable below to something like:
   * https://yourcnd.com/subdir/
   */
  publicBasePath: 'assets',
};
