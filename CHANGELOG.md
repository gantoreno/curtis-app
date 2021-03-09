# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2021-03-09

### Added

- Add testID on every view.
- Create a @ui-kitten/components patch for custom testIDs.
- Add testIDs on HomeNavigator.jsx tab icons.
- Add final testIDs and update e2e test settings.
- Implement e2e testing.

### Changed

- Change button appearances to solid.
- Bump Detox version.
- Change textContentType on SignUpView.jsx password inputs for e2e testing.
- Update form.js tests.
- Replace all confirmation alerts with custom Dialog components.

### Removed

- Remove unnecesary alerts.
- Remove status bar comment on DiagnosisView.jsx.
- Remove alert checking on unit tests.

### Fixed

- Improve callbacks & error handling.
- Improve input validation on SignInView.jsx.

## [0.3.1] - 2021-03-07

### Added

- Display app version on ProfileView.jsx.

### Changed

- Update testIDs for better naming.

### Fixed

- Fix Pd unit & description.

## [0.3.0] - 2021-03-05

### Added

- Add UpdatePasswordView & implement password reset strategies.

## [0.2.0] - 2021-03-05

### Added

- Add EditProfileView.

## [0.1.4] - 2021-02-27

### Changed

- Modularize views.
- Modularize shared components.
- Modularize routes.
- Modularize provider.

## [0.1.3] - 2021-02-18

### Fixed

- Fix automatic parsing of QTcFra.
- Fix alerts on sessionActions.js.

## [0.1.2] - 2021-02-09

### Fixed

- Fixed undefined callback on sessionActions.js.
- Mute console.warn messages on setupTests.js.

## [0.1.1] - 2021-02-01

### Added

- Add Redux to README.md.
- Add Node version status badge.
- Add license status badge.
- Add GitHub Actions status badge.

### Fixed

- Fix typos & broken links on README.md.

## [0.1.0] - 2021-02-01

### Added

- Initial project files.
