'use strict';
exports.__esModule = true;
exports.SCHEME = exports.BASE_PATH = exports.APP_TITLE = void 0;
var packageJson = require('../package.json');
var appTitle = packageJson.name;
if (process.env.ENV_NAME) {
  appTitle += ' [' + process.env.ENV_NAME + ']';
}
exports.APP_TITLE = appTitle;
exports.BASE_PATH = '/api';
exports.SCHEME = process.env.SCHEME === 'http' ? 'http' : 'https';
