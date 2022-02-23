# Cash Program Design Wizard

> The Cash Program Design Wizard tries to help Aid Workers who want to set up best practice Cash Programs for People Affected in multiple contexts.

---

## Status

Latest releases and notable changes are in the [CHANGELOG](CHANGELOG.md).

Preview of the latest (development) versions:

- Front-end/client app: <https://orange-grass-0aefaa103.azurestaticapps.net/>
- Back-end/server API: <https://cpdw-development.azurewebsites.net/api/>

Stable, staging versions:

- Front-end/client app: <https://gentle-bay-081e19d03.azurestaticapps.net/>
- Back-end/server API: <https://cpdw-staging.azurewebsites.net/api/>

Latest test-runs:

- [![CI Tests](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/tests.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/tests.yml)
- [![CodeQL](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/codeql-analysis.yml)

Latest deployments:

- [![CD [client] Azure Static Web App - development](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/azure-static-web-apps-orange-grass-0aefaa103.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/azure-static-web-apps-orange-grass-0aefaa103.yml)
- [![CD [server] - Azure Web App - development](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/main_CPDW-Development.yml/badge.svg)](https://github.com/rodekruis/cash-program-design-wizard/actions/workflows/main_CPDW-Development.yml)

---

## Getting Started

### Set up a local development-environment

- Install Node.js: <https://nodejs.org/en/download/>

  Install the version specified in the [`.node-version`](.node-version)-file.  
  To prevent conflicts it is recommended to use a 'version manager'.

  - [`fnm`](https://github.com/Schniz/fnm#readme) (for Windows/macOS/Linux) After installing, run in this directory:

        fnm use

  - [NVM - Node Version Manager](http://nvm.sh/) (for macOS/Linux) After installing, run in this directory:

        nvm install && nvm use

- Install Docker
  - On macOS, install Docker Desktop: <https://docs.docker.com/docker-for-mac/install/>
  - On Windows, install Docker Desktop: <https://docs.docker.com/docker-for-windows/install/>
  - On Linux:
    - Install Docker Engine: <https://docs.docker.com/engine/install/>
    - Install Docker Compose: <https://docs.docker.com/compose/install/#install-compose-on-linux-systems>

### Install client/server app/development dependencies

Run `npm install` from this directory. Or:

- `npm run install:client` for the front-end only
- `npm run install:server` for the back-end only

To finish you local set-up, run (required only once):

    npm run prepare

To set-up running all relevant lint/test scripts with their related git actions.

## Tests

Automated tests are configured and can be run with:

- `npm test` - for both client & server
- `npm run test:client` - for the front-end only
- `npm run test:server` - for the back-end only

## Mock/test Data

All initial database-contents are hard-coded in the [`server/src/seed-data`](./server/src/seed-data/)-folder.

### Program - [`program-demo.json`](./server/src/seed-data/program-demo.json)

| attribute | type   | explanation               |
| --------- | ------ | ------------------------- |
| `name`    | string | identifier of the program |

### Section - [`sections.json`](./server/src/seed-data/sections.json)

| attribute       | type                | explanation                                |
| --------------- | ------------------- | ------------------------------------------ |
| `name`          | string              | identifier of the section (must be unique) |
| `label`         | translations-object | what users see in the app                  |
| `orderPriority` | number              |                                            |

Example:

```JSON
{
  "name": "pa-info",
  "label": {
    "en": "The people we will help are mostly..."
  },
  "orderPriority": 1
}
```

### Subsection - [`subsections.json`](./server/src/seed-data/subsections.json)

| attribute       | type   | explanation                                   |
| --------------- | ------ | --------------------------------------------- |
| `name`          | string | identifier of the subsection (must be unique) |
| `orderPriority` | number |                                               |
| `section`       | string | must match a `name` of a `section`            |

Example:

```JSON
{
  "name": "pa-gender",
  "orderPriority": 1,
  "section": "pa-info"
},
```

### Question - [`questions.json`](./server/src/seed-data/questions.json)

| attribute       | type           | explanation                                                                              |
| --------------- | -------------- | ---------------------------------------------------------------------------------------- |
| `name`          | string         | identifier of the question (must be unique, used in the narrative report)                |
| `type`          | string         | possible values: `select-1`, `select-n`, `text`, `text-long`, `numeric`                  |
| `label`         | {translations} | what users see in the app                                                                |
| `orderPriority` | number         |
| `subsection`    | string         | must match a `name` of a `subsection`                                                    |
| `tags`          | [string]       | array of strings. possible values: `cash`, `people`, `data`. write it as: "cash", "data" |
| `optionChoices` | [optionChoice] | array of optionChoice objects, **used only for types `select-1` and `select-n`**         |

- `optionChoice`(s)

  Part of the `optionChoices` array attribute inside questions with types `select-1` and `select-2` )

  | attribute       | type           | explanation               |
  | --------------- | -------------- | ------------------------- |
  | `label`         | {translations} | what users see in the app |
  | `name`          | string         | identifier of the option  |
  | `orderPriority` | number         |                           |

Example:

```JSON
{
  "name": "pa-gender-01",
  "type": "select-n",
  "label": {
    "en": "PA Gender"
  },
  "orderPriority": 1,
  "subsection": "pa-gender",
  "tags": ["people"],
  "optionChoices": [
    {
      "label": {
        "en": "Currently Unknown"
      },
      "name": "unknown",
      "orderPriority": 1
    },
    {
      "label": {
        "en": "Female"
      },
      "name": "female",
      "orderPriority": 2
    },
    {
      "label": {
        "en": "Male"
      },
      "name": "male",
      "orderPriority": 3
    },
    {
      "label": {
        "en": "Non Binary"
      },
      "name": "non-binary",
      "orderPriority": 4
    }
  ]
}
```

- ### `{translations}`-object(s)

  Some text-labels (what users see in the app) should be created by a `translations`-object, this can contain multiple versions of the same text in multiple languages/locales.

  Example:

  ```JSON
  {
    "en": "An English text",
    "en_US": "An American text",
    "nl": "Een Nederlandse tekst",
    "nl_BE": "Een Vlaamse tekst"
  }
  ```

  > Switching between multiple languages/locales isn't currently available in the front-end/app, but should be prepared for, by having the data in the database in this format.

- ### Narrative Report

  The text of the narrative report is based on this template.  
  For marking up and lay-outing the contents, [Markdown](https://en.wikipedia.org/wiki/Markdown) can be used.

  See the working examples for the [`demo`-report](server/src/seed-data/narrativeReportTemplate-demo-en.ts) or the [`test`-report](server/src/seed-data/narrativeReportTemplate-test-en.ts).

  A good introduction to the possibilities can be found on:  
  [GiHub Docs: Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

  **Variables** (or the _filled-in answers_)  
  The filled-in answers of the program can be used by including _variables_ in the template in the form of: `{{name-of-question}}`.

  Where `name-of-question` is the value of the `name`-attributes of a question. (see [Question](#question---questionsjson) above.)

  Answers on multiple-choice questions (`"type": "select-n"`) will be rendered as a bullet-list.

  Example:

  ```md
  ## Section-heading

  Multi-line paragraphs,  
  can be used.

  Put _emphasis_ on some words, or make them **stand out** more.

  ### Example:

  The people we want to help identify mostly as:
  {{pa-gender-01}}

  We will spend {{currency}} {{montly-amount}} per month, per {{household-type}}.
  ```

### Hierarchy/Tree-structure

- `program`
  - `section` (1 or more)
    - `subsection` (1 or more)
      - `question` (1 or more)

When these files are changed, a 'reset' of the database is required. This can be done via the endpoint: <http://localhost:3001/scripts/reset>

## Local Development

After this initial set-up, you can start with:

- `npm start` - for both client & server
- `npm run start:client` - for the front-end only
- `npm run start:server` - for the back-end only

The front-end client should be running at: <http://localhost:4200/>.  
The back-end server should be running at: <http://localhost:3001/api/>.

### Database migrations

During development the database-structure will change (e.g. an extra column in a table) while there is already data stored that cannot be lost. In this case we have to apply a migration.

Any time, the database-structure is adapted, before pushing, run:

    npm run migration:generate <name>

This stores all edits in a migration-file, which should be committed and pushed along with your code changes.
On test- and production-server, this file is automatically run by `npm` in the `prestart` stage.

To run this file manually, locally, do:

    npm run migration:run

### Recommended code-editor/IDE tools/extensions

- [Workspace recommendations for VS Code](.vscode/extensions.json)
  When you use [VS Code](https://code.visualstudio.com/) and go to: "_Extensions_" and use the filter: "_Recommended_";
  A list should be shown and each extension can be installed individually.

### Libraries in use in front-end/client app

- [Ionic v6+](https://ionicframework.com/docs/)
- [Angular v13](https://v13.angular.io/docs/)
- [`ngx-translate`](https://github.com/ngx-translate/core#readme)
- [`@auth0/angular-jwt`](https://www.npmjs.com/package/@auth0/angular-jwt)
- [`ngx-markdown`](https://www.npmjs.com/package/ngx-markdown)

### Libraries/frameworks in use in the back-end/server API

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)

### Testing

During development, tests can be run continuously with:

- `npm run watch:test --prefix client` - for the front-end only
- `npm run watch:test --prefix server` - for the back-end only

To simulate a production-environment locally and be able to use all (offline) features, use:

    npm run start:production --prefix client

## Deployment(s)

For both the front- & back-end a shared configuration is used.

Prepare the correct configuration in the `.env`-file, based on the example: [.env.example](./.env.example).  
 For more information, see: [`dotenv`](https://www.npmjs.com/package/dotenv).

      cp .env.example .env

### How to deploy the front-end/client app

The front-end/client app can be deployed as a static single-page-app or PWA.

- Make sure the `.env`-configuration is prepared.
- Run: (from the root-folder)

      npm run build:production --prefix client

- This will generate a folder with all HTML, JS, JSON and SVG assets: [`client/www`](./client/www/)
- This can be deployed to any hosting-solution (supporting HTTPS), using [this server configuration](https://angular.io/guide/deployment#server-configuration).

- The development-preview is automatically deployed using:
  - A GitHub-Action: The workflow is defined in: [`.github/workflows/azure-static-web-apps-....yml`](.github/workflows/azure-static-web-apps-orange-grass-0aefaa103.yml)
  - And the [Azure Static Web App service](https://azure.microsoft.com/en-us/services/app-service/static/).
    - The configuration used is in: [`staticwebapp.config.json`](client/staticwebapp.config.json)
    - See documentation about the format in [this example configuration file](https://docs.microsoft.com/en-us/azure/static-web-apps/configuration#example-configuration-file)

### How to deploy the back-end/server API

The back-end/server API can be deployed as a stand-alone Node.js web-app (connected to a database).

- Make sure the `.env`-configuration is prepared.
- Run: (from the root-folder)

      npm run build --prefix server

- This will generate a folder with all required code: [`server/dist/`](./server/dist/)
- This can be deployed/run as a Node.js service with `npm start`

- The development-preview is automatically deployed via [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) using:
  - A GitHub-Action: The workflow is defined in: [`.github/workflows/main_CPDW-development.yml`](.github/workflows/main_CPDW-Development.yml)

## License

Released under the Apache 2.0 License. See [LICENSE](LICENSE).
