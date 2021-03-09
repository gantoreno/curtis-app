const { v4 } = require('uuid');
const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
  await device.disableSynchronization();
});

const credentials = {
  name: `${v4().split('-')[0]}`,
  email: `${v4().split('-')[0]}@${v4().split('-')[0]}.com`,
  password: `${v4().split('-')[0]}`,
  weight: '75',
  height: '175',
};

describe('signUp', () => {
  it('should successfully sign up', async () => {
    await element(by.id('WelcomeView.SignUpButton')).tap();

    await waitFor(element(by.id('SignUpView')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.id('SignUpView.NameInput')).typeText(credentials.name);
    await element(by.id('SignUpView.EmailInput')).typeText(credentials.email);
    await element(by.id('SignUpView.PasswordInput')).typeText(
      credentials.password
    );
    await element(by.id('SignUpView.PasswordRepeatInput')).typeText(
      credentials.password
    );
    await element(by.id('SignUpView.PasswordRepeatInput')).tapReturnKey();

    await element(by.id('SignUpView.SignUpButton')).tap();

    await waitFor(element(by.id('OneMoreStepView')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.text('Select Option')).tap();
    await waitFor(element(by.text('Male')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.text('Male')).tap();

    await waitFor(element(by.text('dd/mm/yyyy')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.text('dd/mm/yyyy')).tap();

    await waitFor(element(by.id('CalendarHeader.ChevronDown')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.id('CalendarHeader.ChevronDown')).tap();
    await element(by.id('CalendarHeader.ChevronLeft')).tap();
    await element(by.id('CalendarHeader.ChevronLeft')).tap();

    await waitFor(element(by.text('2001')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.text('2001')).tap();

    await waitFor(element(by.text('Apr')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.text('Apr')).tap();

    await waitFor(element(by.text('24')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.text('24')).tap();

    await waitFor(element(by.id('OneMoreStepView.WeightInput')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('OneMoreStepView.WeightInput')).typeText(
      credentials.weight
    );
    await element(by.id('OneMoreStepView.HeightInput')).typeText(
      credentials.height
    );
    await element(by.id('OneMoreStepView.HeightInput')).tapReturnKey();
    await element(by.id('OneMoreStepView.SignUpButton')).tap();

    await waitFor(element(by.id('HomeView')))
      .toBeVisible()
      .withTimeout(8000);
  });
});
