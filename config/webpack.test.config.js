const Dotenv = require('dotenv');
const fs = require('fs');
const NodeExternals = require('webpack-node-externals');
const config = require('./assets.config');

// Load .env settings
(function loadDotEnvFile() {
  const fileString = fs.readFileSync(`${config.appPath}/.env`, { encoding: 'utf-8' });
  // Ensure that it works with `export` suffix on variables
  const parsedObj = Dotenv.parse(fileString.replace(/export\s+/g, ''));

  Object.entries(parsedObj)
    .forEach(([key, value]) => { if (!process.env[key]) process.env[key] = value; });
}());

module.exports = function appendConfig(webpackConfig) {
  // This is a custom setting used to enable a better NYC integration.
  //
  // WARNING: We're mutating `webpackConfig` object on-the-fly, instead of
  // returning a `override` object.
  //
  // * https://github.com/kriansa/vue-loader/commit/751c867b5bf6d51b36f56d9658c8f569d639f33d
  // * https://github.com/vuejs/vue-loader/issues/987
  const { module } = webpackConfig;
  module.rules.find(rule => rule.loader === 'vue-loader').options.cacheBusting = false;

  return {
    devtool: 'inline-cheap-module-source-map',
    target: 'node', // webpack should compile node compatible code
    externals: [NodeExternals()], // in order to ignore all modules in node_modules folder
  };
};
