const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
  await device.disableSynchronization();
});

const credentials = {
  email: '20b377a0@995858f4.com',
  password: 'a1fb0f87',
};

describe('signIn', () => {
  beforeAll(async () => {
    await element(by.id('WelcomeView.SignInButton')).tap();

    await waitFor(element(by.id('SignInView')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.id('SignInView.EmailInput')).typeText(credentials.email);
    await element(by.id('SignInView.PasswordInput')).typeText(
      credentials.password
    );
    await element(by.id('SignInView.PasswordInput')).tapReturnKey();

    await element(by.id('SignInView.SignInButton')).tap();

    await waitFor(element(by.id('HomeView')))
      .toBeVisible()
      .withTimeout(8000);
  });

  it('should successfully sign in', async () => {
    await element(by.id('HomeNavigator.ProfileTab')).atIndex(0).tap();

    await waitFor(element(by.id('ProfileView')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('ProfileView.SignOutButton')).tap();

    await waitFor(element(by.id('ProfileView.SignOutDialog.YesButton')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('ProfileView.SignOutDialog.YesButton')).tap();

    await waitFor(element(by.id('WelcomeView')))
      .toBeVisible()
      .withTimeout(8000);
  });
});
