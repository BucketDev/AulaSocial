// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBQMok4ve-a-pjPLqW6-9mFEPeVuU40rOU",
    authDomain: "aula-social.firebaseapp.com",
    databaseURL: "https://aula-social.firebaseio.com",
    projectId: "aula-social",
    storageBucket: "aula-social.appspot.com",
    messagingSenderId: "377734350824",
    appId: "1:377734350824:web:9dea19a43268f79868c65d",
    measurementId: "G-JXC4L0EC6F"
  },
  drive: {
    apiKey: "AIzaSyAMVg1lk7zb095jN9gFONHfdZF3HpoH2JE",
    clientId: "377734350824-8ck7jvon2n34b06u5f7ojgrsrkrhvd6i.apps.googleusercontent.com",
    discoveryDocs: [ "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest" ],
    scopes: [ "email", "profile", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events" ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
