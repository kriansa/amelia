const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const fs = require('fs');
const webpack = require('webpack');
const stylelint = require('stylelint');
const ESLint = require('eslint');
const config = require('./config/assets.config');
const WebpackWatcher = require('./config/webpack.watcher');

// Change current working dir to root app
process.chdir(config.appPath);

/**
 * Lint both CSS and JS files
 */
gulp.task('lint', ['lint:css', 'lint:js']);

/**
 * Runs the whole build pipeline
 */
gulp.task('build', ['lint', 'compile']);

/**
 * Default action is build
 */
gulp.task('default', ['build']);

/**
 * Uses stylelint to lint project's CSS & SCSS files
 */
gulp.task('lint:css', (cb) => {
  stylelint.lint({
    configFile: '.stylelintrc.yml',
    configBasedir: config.appPath,
    files: [`${config.appPath}/**/*.?(vue|scss|css)`],
    syntax: 'scss',
    formatter: 'verbose',
  }).then((lintResult) => {
    console.log(lintResult.output); // eslint-disable-line no-console

    if (lintResult.errored === true) {
      const totalWarnings = lintResult.results
        .map(r => r.warnings)
        .reduce((entry, result) => result.concat(entry), [])
        .length;
      const errorWord = totalWarnings === 1 ? 'problem' : 'problems';
      const error = {
        showStack: false,
        toString: () => `Failed with ${gutil.colors.red(totalWarnings)} ${errorWord}`,
      };

      return cb(error);
    }

    return cb();
  })
  .catch(cb);
});

/**
 * Uses eslint to lint project's JS files
 */
gulp.task('lint:js', () => {
  const cli = new ESLint.CLIEngine({
    extensions: ['.js', '.vue'],
  });

  const formatter = cli.getFormatter();
  const output = cli.executeOnFiles(['.']);

  console.log(formatter(output.results)); // eslint-disable-line no-console

  if (output.errorCount >= 1) {
    const errorWord = output.errorCount === 1 ? 'problem' : 'problems';
    const error = {
      showStack: false,
      toString: () => `Failed with ${gutil.colors.red(output.errorCount)} ${errorWord}`,
    };

    throw error;
  }
});

/**
 * Delete all files in the assets output folder
 */
gulp.task('clean', () => del(`${config.appPath}/${config.outputRelativePath}`));

/**
 * Starts webpack in watching mode
 */
gulp.task('watch', (cb) => { // eslint-disable-line no-unused-vars
  const watcher = new WebpackWatcher({
    basePath: config.appPath,
    webpackConfigFile: 'config/webpack.config.js',
    writeErrorFile: 'tmp/webpack-error.txt',
    watchFolders: [`${config.entryPointsRelativePath}/**/*.*`],
    watchFiles: ['package.json', 'config/webpack.*.js', 'config/assets.config.js'],
    onCompile: ({ messages, time }) => {
      const totalTime = gutil.colors.magenta(`${time || '?'} ms`);

      if (messages.length) {
        messages.forEach((m) => { console.log(m); }); // eslint-disable-line no-console
        const errorWord = messages.length > 1 ? 'errors' : 'error';
        gutil.log('Compilation failed with', gutil.colors.red(messages.length), errorWord, 'in', totalTime);
      } else {
        gutil.log('Compiled in', totalTime);
      }
    },
  });

  watcher.start();
});

/**
 * Compiles all assets
 */
gulp.task('compile', ['clean'], (cb) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const compiler = webpack(require(`${config.appPath}/config/webpack.config.js`));
  fs.mkdirSync(`${config.appPath}/${config.outputRelativePath}`);

  compiler.run((err, stats) => {
    if (err) {
      cb(err.stack || err);
    } else if (stats.hasErrors() || stats.hasWarnings()) {
      cb(stats.toString('verbose'));
    } else {
      cb();
    }
  });
});
