import packageJson = require('../package.json');

let appTitle = packageJson.name;
if (process.env.ENV_NAME) {
  appTitle += ` [${process.env.ENV_NAME}]`;
}
export const APP_TITLE = appTitle;

export const BASE_PATH = '/api';

export const SCHEME = process.env.SCHEME === 'http' ? 'http' : 'https';
