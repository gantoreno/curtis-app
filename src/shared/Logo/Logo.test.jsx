/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import Logo from './Logo';

describe('Logo', () => {
  it('renders without crashing', async () => {
    shallow(<Logo.Main />);
    shallow(<Logo.Welcome />);
    shallow(<Logo.Inverse />);
  });
});
