/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import OneMoreStepView from './OneMoreStepView';
import { AppProvider } from '../provider';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockState = {
  session: {
    isLoading: false,
  },
};
const mockRoute = {
  params: {
    name: 'Test user',
    email: 'user@test.com',
    password: 'TestPassword123.',
  },
};

describe('OneMoreStepView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <OneMoreStepView route={mockRoute} />
      </AppProvider>
    );
  });

  it('disables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <OneMoreStepView route={mockRoute} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'OneMoreStepView.SignUpButton'
        )
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('enables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <OneMoreStepView route={mockRoute} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'OneMoreStepView.Input-sex')
      .first()
      .props()
      .onSelect({ row: 0 });
    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'OneMoreStepView.Input-birthDate'
      )
      .first()
      .props()
      .onSelect(new Date('Jan 1, 2000'));
    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'OneMoreStepView.Input-weight'
      )
      .first()
      .props()
      .onChangeText('60');
    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'OneMoreStepView.Input-height'
      )
      .first()
      .props()
      .onChangeText('175');

    expect(
      wrapper
        .update()
        .findWhere(
          (node) => node.prop('testID') === 'OneMoreStepView.SignUpButton'
        )
        .first()
        .prop('disabled')
    ).toBe(false);
  });
});
