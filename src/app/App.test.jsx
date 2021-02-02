/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { AppProvider } from '../provider';

describe('App', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <App />
      </AppProvider>
    );
  });
});
