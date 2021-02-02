/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Tag from './Tag';
import { AppProvider } from '../provider';

describe('Tag', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <Tag />
      </AppProvider>
    );
  });

  it('displays status correctly', async () => {
    const wrapper1 = mount(
      <AppProvider>
        <Tag />
      </AppProvider>
    );
    const wrapper2 = mount(
      <AppProvider>
        <Tag isExternal />
      </AppProvider>
    );

    expect(wrapper1.find('Text').at(0).text()).toMatch(/own/i);
    expect(wrapper2.find('Text').at(0).text()).toMatch(/external/i);
  });
});
