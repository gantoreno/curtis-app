/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import HomeNavigator from './HomeNavigator';
import { AppProvider } from '../provider';

describe('HomeNavigator', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <HomeNavigator />
      </AppProvider>
    );
  });
});
