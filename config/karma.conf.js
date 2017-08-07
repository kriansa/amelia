// Karma configuration
const webpackConfig = require('./webpack.config.js');

// Clear webpack entry
webpackConfig.entry = null;

module.exports = function karmaConfig(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'app/assets/javascripts/tests/**/*.spec.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // webpack settings
    webpack: webpackConfig,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/assets/javascripts/**/*.spec.js': ['webpack', 'sourcemap'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'html', 'coverage'],

    coverageReporter: {
      dir: 'report/javascript/coverage',
      includeAllSources: true, // TODO: This is currently not working. Make it work
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text-summary' },
      ],
    },

    htmlReporter: {
      outputFile: 'report/javascript/tests.html',

      // Optional
      pageTitle: 'Test suite',
      subPageTitle: 'Unit and integration tests report',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
    // config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
