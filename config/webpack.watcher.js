var webpack = require('webpack');
var chokidar = require('chokidar');
var decache = require('decache');
var path = require('path');
var fs = require('fs');

let appPath = path.resolve(__dirname, '..');
let configFile = `${appPath}/config/webpack.config.js`;
let pathGlob = require(configFile).entryPointPath + '/**/*.*';
let npmPackageFile = `${appPath}/package.json`;

var Webpack = {
  _watching: null,

  _compiler: function() {
    decache(configFile);
    let config = require(configFile);
    return webpack(config.webpack);
  },

  start: function() {
    Webpack._watching = Webpack._compiler().watch(undefined, Webpack.onCompile);
  },

  stop: function() {
    return new Promise(function(resolve) {
      Webpack._watching.close(resolve);
    });
  },

  onCompile: function(err, stats) {
    if (!stats) {
      return;
    }

    if (stats.hasErrors()) {
      let errorMessage = stats.toString({
        context: appPath,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: true,
        chunkOrigins: false,
      });

      fs.writeFile(`${appPath}/tmp/webpack-error.txt`, errorMessage);
      console.error(errorMessage);
    }

    else {
      fs.access(`${appPath}/tmp/webpack-error.txt`, fs.constants.F_OK, function (err) {
        if (!err) { fs.unlink(`${appPath}/tmp/webpack-error.txt`) }
      });

      console.log('Assets compiled:', stats.toJson({
        context: appPath,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: false,
        chunkOrigins: false,
      })['time'] + 'ms')
    }

    if (stats.hasWarnings()) {
      console.warn(stats.toString('minimal'));
    }
  },

  restart: function() {
    console.log('Restarting webpack...');
    Webpack.stop().then(Webpack.start);
  }
};

var watcher = chokidar.watch([pathGlob, configFile, npmPackageFile], {
  ignored: /[\/]\./,
  ignoreInitial: true
});

// Signal handler
process.on('SIGINT', function() {
  console.log("Stopping webpack watcher...");
  Webpack.stop();
  watcher.close();
  process.exit();
});

// Watches for add/delete files
watcher.on('add', Webpack.restart).on('unlink', Webpack.restart).on('change', function(path) {
  if (path === npmPackageFile || path === configFile) { Webpack.restart() }
});

// ... then start it
Webpack.start();
