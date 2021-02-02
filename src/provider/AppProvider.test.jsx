/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import AppProvider from './AppProvider';

describe('AppProvider', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <Text>Hello, world!</Text>
      </AppProvider>
    );
  });
});
