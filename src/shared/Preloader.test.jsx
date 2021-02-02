/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import Preloader from './Preloader';
import { AppProvider } from '../provider';

describe('Logo', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <Preloader />
      </AppProvider>
    );
  });
});
