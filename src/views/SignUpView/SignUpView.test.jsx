/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import SignUpView from './SignUpView';
import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockState = {
  session: {
    isLoading: false,
  },
};

describe('SignUpView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <SignUpView navigation={navigation} />
      </AppProvider>
    );
  });

  it('disables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignUpView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'SignUpView.SignUpButton')
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('enables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignUpView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'SignUpView.Input-name')
      .first()
      .props()
      .onChangeText('Test user');
    wrapper
      .findWhere((node) => node.prop('testID') === 'SignUpView.Input-email')
      .first()
      .props()
      .onChangeText('user@test.com');
    wrapper
      .findWhere((node) => node.prop('testID') === 'SignUpView.Input-password')
      .first()
      .props()
      .onChangeText('TestPassword123.');
    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'SignUpView.Input-passwordRepeat'
      )
      .first()
      .props()
      .onChangeText('TestPassword123.');

    expect(
      wrapper
        .update()
        .findWhere((node) => node.prop('testID') === 'SignUpView.SignUpButton')
        .first()
        .prop('disabled')
    ).toBe(false);
  });

  it('navigates to sign in view on redirect press', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignUpView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'SignUpView.SignInRedirect')
      .first()
      .simulate('click');

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
