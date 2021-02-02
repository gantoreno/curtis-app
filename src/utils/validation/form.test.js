import {
  validateSex,
  validateName,
  validateEmail,
  validateWeight,
  validateHeight,
  validatePassword,
  validatePasswordRepeat,
  validateBirthDate,
  validateHR,
  validatePd,
  validatePQ,
  validateQRS,
  validateQT,
  validateQTcFra,
} from './form';

describe('Form', () => {
  it('correctly validates sex', () => {
    expect(validateSex(-1)).toBe(false);
    expect(validateSex(0)).toBe(true);
    expect(validateSex(1)).toBe(true);
    expect(validateSex(2)).toBe(false);
  });

  it('correctly validates name', () => {
    expect(validateName('')).toBe(false);
    expect(validateName('a')).toBe(false);
    expect(validateName('a')).toBe(false);
    expect(validateName('Foo')).toBe(true);
    expect(validateName('Foo123')).toBe(false);
  });

  it('correctly validates email', () => {
    expect(validateEmail('user@test.com')).toBe(true);
    expect(validateEmail('user@test')).toBe(false);
    expect(validateEmail('@test.com')).toBe(false);
  });

  it('correctly validates weight', () => {
    expect(validateWeight('-1')).toBe(false);
    expect(validateWeight('54')).toBe(true);
    expect(validateWeight('501')).toBe(false);
  });

  it('correctly validates height', () => {
    expect(validateHeight('-5')).toBe(false);
    expect(validateHeight('150')).toBe(true);
    expect(validateHeight('310')).toBe(false);
  });

  it('correctly validates password', () => {
    expect(validatePassword('asdasd')).toBe(false);
    expect(validatePassword('123123')).toBe(false);
    expect(validatePassword('AsdAsd123.')).toBe(true);
  });

  it('correctly validates password repeat', () => {
    expect(validatePasswordRepeat('TestPass123.', 'testPass123.')).toBe(false);
    expect(validatePasswordRepeat('TestPass123.', 'TESTPass123.')).toBe(false);
    expect(validatePasswordRepeat('TestPass123.', 'TestPass123.')).toBe(true);
  });

  it('correctly validates birth date', () => {
    expect(validateBirthDate('Jan 1, 2000')).toBe(true);
  });

  it('correctly validates HR', () => {
    expect(validateHR('29')).toBe(false);
    expect(validateHR('75')).toBe(true);
    expect(validateHR('151')).toBe(false);
  });

  it('correctly validates Pd', () => {
    expect(validatePd('39')).toBe(false);
    expect(validatePd('154')).toBe(true);
    expect(validatePd('271')).toBe(false);
  });

  it('correctly validates PQ', () => {
    expect(validatePQ('49')).toBe(false);
    expect(validatePQ('254')).toBe(true);
    expect(validatePQ('351')).toBe(false);
  });

  it('correctly validates QRS', () => {
    expect(validateQRS('19')).toBe(false);
    expect(validateQRS('65')).toBe(true);
    expect(validateQRS('191')).toBe(false);
  });

  it('correctly validates QT', () => {
    expect(validateQT('109')).toBe(false);
    expect(validateQT('302')).toBe(true);
    expect(validateQT('641')).toBe(false);
  });

  it('correctly validates QTcFra', () => {
    expect(validateQTcFra('149')).toBe(false);
    expect(validateQTcFra('389')).toBe(true);
    expect(validateQTcFra('651')).toBe(false);
  });
});
