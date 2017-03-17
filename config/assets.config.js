const path = require('path');
const Bourbon = require('bourbon');
const BourbonNeat = require('bourbon-neat');

module.exports = {
  appPath: path.resolve(__dirname, '..'),
  entryPointsRelativePath: 'app/assets/javascripts/actions',
  stylesheetsRelativePath: 'app/assets/stylesheets',
  outputRelativePath: 'public/assets',

  // Additional load paths for Sass
  sassIncludePaths: [
    // Add here paths to be used on lookup for Sass/SCSS files on compile-time
    // e.g. 'app/v2/css/mymodule'
    ...BourbonNeat.includePaths,
    ...Bourbon.includePaths,
  ],
};
