# Cash Program Design Wizard

> The Cash Program Design Wizard tries to help Aid Workers who want to set up best practice Cash Programs for People Affected in multiple contexts.

## Status

Latest releases and notable changes are in the [CHANGELOG](CHANGELOG.md).

A preview of the latest (development) version of the front-end/client app can be seen on: <https://orange-grass-0aefaa103.azurestaticapps.net/>

[![CI Tests](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/tests.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/tests.yml)
[![CodeQL](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/codeql-analysis.yml)
[![CD Azure Static Web App - development](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/azure-static-web-apps-orange-grass-0aefaa103.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/azure-static-web-apps-orange-grass-0aefaa103.yml)


## Getting Started

To set up a local development-environment:

- Install Node.js: <https://nodejs.org/en/download/>

  Install the version specified in the [`.node-version`](.node-version)-file.  
  To prevent conflicts it is recommended to use a 'version manager'.

  - [`fnm`](https://github.com/Schniz/fnm#readme) (for Windows/macOS/Linux) After installing, run in this directory:

        fnm use

  - [NVM - Node Version Manager](http://nvm.sh/) (for macOS/Linux) After installing, run in this directory:

        nvm install && nvm install-latest-npm

### Install client/server app/development dependencies

Run `npm install` from this directory. Or:

- `npm install --workspace client` for the front-end only
- `npm install --workspace server` for the back-end only

To finish you local set-up, run:

    npx husky install

To set-up running all relevant lint/test scripts with their related git actions.

## Tests

Automated tests are configured and can be run with:

- `npm test` - for both client & server
- `npm run test:client` - for the front-end only
- `npm run test:server` - for the back-end only

## Local Development

After this initial set-up, you can start with:

- `npm start` - for both client & server
- `npm run start:client` - for the front-end only
- `npm run start:server` - for the back-end only

The front-end client should be running at: <http://localhost:4200/>.  
The back-end server should be running at: <http://localhost:3000/>.

### Recommended code-editor/IDE tools/extensions

- [Workspace recommendations for VS Code](.vscode/extensions.json)  
  When you use [VS Code](https://code.visualstudio.com/) and go to: "_Extensions_" and use the filter: "_Recommended_";  
  A list should be shown and each extension can be installed individually.

### Testing

During development, tests can be run continuously with:

- `npm run watch:test --workspace client` - for the front-end only
- `npm run watch:test --workspace server` - for the back-end only

## License

Released under the Apache 2.0 License. See [LICENSE](LICENSE).
