/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import AppNavigator from './AppNavigator';
import { AppProvider } from '../provider';

describe('AppNavigator', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    );
  });
});
