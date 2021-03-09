const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
  await device.disableSynchronization();
});

const credentials = {
  email: '20b377a0@995858f4.com',
  password: 'a1fb0f87',
};
const patient = {
  HR: '133',
  Pd: '80',
  PQ: '96',
  QRS: '102',
  QT: '304',
  QTcFra: '389',
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
    await element(by.id('HomeView.CurtisButton')).atIndex(0).tap();

    await waitFor(element(by.id('HomeView.DiagnosisDialog.OwnButton')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('HomeView.DiagnosisDialog.OwnButton')).tap();

    await waitFor(element(by.id('DiagnosisView')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.id('DiagnosisView.HRInput')).typeText(patient.HR);
    await element(by.id('DiagnosisView.PdInput')).typeText(patient.Pd);
    await element(by.id('DiagnosisView.PQInput')).typeText(patient.PQ);
    await element(by.id('DiagnosisView.QRSInput')).typeText(patient.QRS);
    await element(by.id('DiagnosisView.QTInput')).typeText(patient.QT);
    await element(by.id('DiagnosisView.QTcFraInput')).typeText(patient.QTcFra);
    await element(by.id('DiagnosisView.QTcFraInput')).tapReturnKey();

    await element(by.id('DiagnosisView.DiagnoseButton')).tap();

    await waitFor(element(by.id('DetailsView')))
      .toBeVisible()
      .withTimeout(8000);

    await element(by.id('DetailsView.SaveButton')).tap();

    await waitFor(element(by.id('HomeView')))
      .toBeVisible()
      .withTimeout(8000);
    await waitFor(element(by.id('DetailsView')))
      .toBeNotVisible()
      .withTimeout(8000);

    await element(by.id('HomeView.ViewHistoryButton')).tap();

    await waitFor(element(by.id('HistoryView')))
      .toBeVisible()
      .withTimeout(8000);

    await waitFor(
      element(by.id('HistoryView.HistoryCard.ViewButton')).atIndex(0)
    )
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('HistoryView.HistoryCard.ViewButton')).tap();

    await waitFor(element(by.id('DetailsView')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('DetailsView.DeleteButton')).tap();

    await waitFor(element(by.id('DetailsView.DeleteDiagnosisDialog.YesButton')))
      .toBeVisible()
      .withTimeout(8000);
    await element(by.id('DetailsView.DeleteDiagnosisDialog.YesButton')).tap();

    await waitFor(element(by.id('HistoryView')))
      .toBeVisible()
      .withTimeout(8000);
  });
});
