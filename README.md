<div align="center">
  <img src="assets/logo.svg" width="300" height="300"></img>
</div>

# Curtis – The application

![Node.js CI](https://github.com/gantoreno/curtis-app/workflows/Node.js%20CI/badge.svg) ![Node version](https://img.shields.io/badge/node-v14.x-brightgreen) ![License](https://img.shields.io/github/license/gantoreno/curtis-app)

Files for the [Curtis](https://github.com/gantoreno/curtis-engine) mobile application, the system's main distribution channel. This app was built with [React Native](https://reactnative.dev/) through [Expo](https://expo.io/) and [Firebase](https://firebase.google.com/) as serverless cloud provider, as well as [Redux](https://es.redux.js.org/) for state management.

The app's purpose is to be a way for medical experts to have a lightweight, fast, portable & secure diagnosis system when performing ECG analysis on their patients (and their own diagnoses too). Create an account, and start diagnosing just by entering the required ECG values & vital information. When diagnosing, you can choose to store the results in order to keep them for the future, or discard them if you no longer need them.

## Usage

In order to build and test the Curtis app locally, you must have a local version of the [Curtis server](https://github.com/gantoreno/curtis-server) running on your machine (or in any cloud provider of your choice). Please see the [usage](https://github.com/gantoreno/curtis-server#usage) section on the Curtis server repo to see instructions on how to set up the server.

You'll also have to create a custom [Firebase project](https://console.firebase.google.com/) in order for the app to communicate with Firebase's Firestore database & authentication functions.

After that, to build the Curtis app from source, first clone the repo:

```sh
$ git clone https://github.com/gantoreno/curtis-app.git
$ cd curtis-app
```

Install all the required dependencies with [Yarn](https://yarnpkg.com/):

```sh
$ yarn install
```

Then, rename the `.env.example` file to `.env` and place inside all the environment variables, the `CURTIS_SERVER` should be an url pointing to your version of the Curtis server, where all calculations will get performed, and the `FIREBASE_*` ones are Firebase variables.

In your admin console, follow the steps to add the [Firebase SDK](https://firebase.google.com/docs/web/setup?hl=es) to your project, and add each value to its corresponding key inside the `.env` file.

### iOS

To run the iOS version of the app, make sure you have the latest [Xcode](https://developer.apple.com/xcode/) version, and a simulator ready to use.

In your terminal, run:

```sh
$ yarn ios
```

The app should now open in the expo client of the iOS simulator.

### Android

To run the Android version of the app, make sure you have the latest [Android Studio](https://developer.android.com/studio?hl=es-419&gclid=Cj0KCQiA6t6ABhDMARIsAONIYyzR_TZ4XM8PJdM1ihZAC2up8BVMKTw0U2nVquJAN5fi2rpxaCGNYpMaAiRkEALw_wcB&gclsrc=aw.ds) version, and a simulator ready to use.

In your terminal, run:

```sh
$ yarn android
```

The app should now open in the expo client of the Android simulator.

## Testing

The Curtis app uses [Jest](https://jestjs.io/) as a test runner, together with [Enzyme](https://enzymejs.github.io/enzyme/) as rendering library for the unit testing suites. For end-to-end testing, [Detox](https://github.com/wix/Detox) comes into place to install the app and run all tests inside the `e2e` folder.

> Due to technical reasons, Enzyme is using [JSDOM](https://github.com/jsdom/jsdom/releases) version [15.2.1](https://github.com/jsdom/jsdom/releases/tag/15.2.1), since [16.4.0] introduced some issues that make testing impossible for React Native components with Enzyme's `mount` (see [this](https://github.com/enzymejs/enzyme/issues/2437) issue). Because it's an older release, all `console.error` messages have been mocked to a `jest.fn()` function in order to mute them, since JSDOM complains about component casing, but does run the tests well, and that's what matters the most.

### Unit tests

To run unit tests, type in your terminal:

```sh
$ yarn test
```

Jest should now test all the test suites inside the `src` folder.

### End-to-end tests

Running e2e tests are a more complex task. As someone once said, _e2e tests are expensive_. For this, you'll have to create an [Expo account](https://expo.io/signup) (it'll be necessary for the build process). Application binaries must be built and placed inside the `bin` folder before any test takes place.

The Expo CLI will prompt you for your expo account, after that, the build process will start. Check the URL to see the build queue and download the assets once the build process has finished. See the [Expo build guide](https://docs.expo.io/distribution/building-standalone-apps/) for standalone apps.

To build an iOS `.app` file, open your terminal and type the following:

```sh
$ expo build:ios -t simulator # for iOS .app files
$ expo build:android -t apk # for Android .apk files
```

The build process will start and once done, download the binaries and place them inside their corresponding folders, `bin/ios` for the `.app` file, and `bin/android` for the `.apk` file.

Finally, to run the tests:

```sh
$ yarn e2e -c ios # for iOS testing
$ yarn e2e -c android # for Android testing
```

## License

This project is licensed under the [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html) license.
