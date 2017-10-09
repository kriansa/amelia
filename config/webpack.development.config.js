const Dotenv = require('dotenv');
const fs = require('fs');
const config = require('./assets.config');

// Load .env settings
(function loadDotEnvFile() {
  const fileString = fs.readFileSync(`${config.appPath}/.env`, { encoding: 'utf-8' });
  // Ensure that it works with `export` suffix on variables
  const parsedObj = Dotenv.parse(fileString.replace(/export\s+/g, ''));

  Object.entries(parsedObj)
    .forEach(([key, value]) => { if (!process.env[key]) process.env[key] = value; });
}());

module.exports = function appendConfig() {
  return {
    // Optimize the generation of SourceMaps
    // More info: https://webpack.github.io/docs/build-performance.html
    devtool: 'cheap-module-source-map',
  };
};
