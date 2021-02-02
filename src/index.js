/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';

import { App } from './app';
import { AppProvider } from './provider';

LogBox.ignoreLogs(['Setting a timer']);

export default registerRootComponent(() => (
  <AppProvider>
    <App />
  </AppProvider>
));
