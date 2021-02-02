/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import FormLabel from './FormLabel';
import { AppProvider } from '../provider';

describe('FormLabel', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <FormLabel title="Test title" />
      </AppProvider>
    );
  });

  it('displays required props', async () => {
    const wrapper = mount(
      <AppProvider>
        <FormLabel title="Test title" />
      </AppProvider>
    );

    expect(wrapper.find('Text').at(0).text()).toMatch(/test title/i);
  });

  it('displays optional props', async () => {
    const wrapper = mount(
      <AppProvider>
        <FormLabel title="Test title" unit="Test unit" required />
      </AppProvider>
    );

    expect(wrapper.find('Text').at(5).text()).toMatch(/(test unit)/i);
    expect(wrapper.find('Text').at(13).text()).toMatch(/\*/i);
  });
});
