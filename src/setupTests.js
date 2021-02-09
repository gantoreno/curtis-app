/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://127.0.0.1',
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.console = {
  log: console.log,
  error: jest.fn(),
  warn: jest.fn(),
  info: console.info,
  debug: console.debug,
};

copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });
