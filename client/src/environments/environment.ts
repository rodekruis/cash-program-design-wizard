// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Configuration/Feature-switches:

  // Load hard-coded test-data from file, instead of from the server
  useMockData: true,

  // Let the interface automatically detect + switch to Dark-mode if a user prefers it
  autoDarkMode: false,

  // Optional label to show which version is used
  envName: '',

  // The language that will be loaded first and used as a fallback
  defaultLanguage: 'en',

  // URLS:
  // apiUrl: 'http://localhost:3001',
  apiUrl: 'https://cpdw-development.azurewebsites.net',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
