// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const preprocessors = {
  '**/*.spec.ts': ['sourcemap', 'espower']
}

module.exports = function(config) {
  config.set({
    basePath: '',
    preprocessors,
    frameworks: ['mocha', 'power-assert', '@angular/cli'],
    plugins: [
      require('karma-mocha'),
      require('karma-power-assert'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-espower-preprocessor'),
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  })
}
