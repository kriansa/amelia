const path = require('path');
const Bourbon = require('bourbon');
const BourbonNeat = require('bourbon-neat');

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

  // Additional load paths for Sass
  sassIncludePaths: [
    // Add here paths to be used on lookup for Sass/SCSS files on compile-time
    // e.g. 'app/v2/css/mymodule'
    `${appPath}/app/assets/stylesheets`,
    ...BourbonNeat.includePaths,
    ...Bourbon.includePaths,
  ],
};
