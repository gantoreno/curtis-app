/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import AuthNavigator from './AuthNavigator';
import { AppProvider } from '../../provider';

describe('AuthNavigator', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <AuthNavigator />
      </AppProvider>
    );
  });
});
