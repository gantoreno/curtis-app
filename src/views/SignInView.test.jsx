/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import SignInView from './SignInView';
import { navigation } from '../../__mocks__';
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

describe('SignInView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <SignInView navigation={navigation} />
      </AppProvider>
    );
  });

  it('disables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignInView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'SignInView.SignInButton')
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('enables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignInView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'SignInView.Input-email')
      .first()
      .props()
      .onChangeText('user@test.com');
    wrapper
      .findWhere((node) => node.prop('testID') === 'SignInView.Input-password')
      .first()
      .props()
      .onChangeText('TestPassword123.');

    expect(
      wrapper
        .update()
        .findWhere((node) => node.prop('testID') === 'SignInView.SignInButton')
        .first()
        .prop('disabled')
    ).toBe(false);
  });

  it('navigates to sign up view on redirect press', async () => {
    const wrapper = mount(
      <AppProvider>
        <SignInView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'SignInView.SignUpRedirect')
      .first()
      .simulate('click');

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
