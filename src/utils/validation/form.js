import validator from 'validator';
import emailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

export const validateName = (name) =>
  validator.isAlpha(name, ['en-US'], { ignore: ' ' }) &&
  validator.isLength(name, { min: 3, max: 32 });

export const validateEmail = (email) => emailValidator.validate(email);

export const validatePassword = (password) =>
  new PasswordValidator()
    .is()
    .min(8)
    .is()
    .max(16)
    .has()
    .not()
    .spaces()
    .validate(password);

export const validatePasswordRepeat = (password, passwordRepeat) =>
  validator.equals(password, passwordRepeat);

export const validateSex = (sex) => sex === 0 || sex === 1;

export const validateBirthDate = (birthDate) =>
  new Date(birthDate) instanceof Date;

export const validateWeight = (weight) =>
  !!weight && validator.isFloat(weight, { min: 0, max: 500 });

export const validateHeight = (height) =>
  !!height && validator.isFloat(height, { min: 0, max: 300 });

export const validateHR = (HR) =>
  !!HR && validator.isFloat(HR, { min: 30, max: 150 });

export const validatePd = (Pd) =>
  !!Pd && validator.isFloat(Pd, { min: 40, max: 270 });

export const validatePQ = (PQ) =>
  !!PQ && validator.isFloat(PQ, { min: 50, max: 350 });

export const validateQRS = (QRS) =>
  !!QRS && validator.isFloat(QRS, { min: 20, max: 190 });

export const validateQT = (QT) =>
  !!QT && validator.isFloat(QT, { min: 110, max: 640 });

export const validateQTcFra = (QTcFra) =>
  (!!QTcFra && validator.isFloat(QTcFra, { min: 150, max: 650 })) ||
  validator.equals(QTcFra, '');
