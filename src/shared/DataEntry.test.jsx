/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import DataEntry from './DataEntry';
import { AppProvider } from '../provider';

describe('DataEntry', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <DataEntry value="Test value" label="Test entry" />
      </AppProvider>
    );
  });

  it('displays required props', async () => {
    const wrapper = mount(
      <AppProvider>
        <DataEntry value="Test value" label="Test entry" />
      </AppProvider>
    );

    expect(wrapper.find('Text').at(0).text()).toMatch(/test entry/i);
    expect(wrapper.find('Text').at(7).text()).toMatch(/test value/i);
  });

  it('displays optional props', async () => {
    const wrapper = mount(
      <AppProvider>
        <DataEntry value="Test value" label="Test entry" unit="Test unit" />
      </AppProvider>
    );

    expect(wrapper.find('Text').at(11).text()).toMatch(/test unit/i);
  });
});
