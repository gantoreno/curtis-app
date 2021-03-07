/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';
import UpdatePasswordView from './UpdatePasswordView';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

const mockState = {
  session: {
    user: {
      sex: 0,
      name: 'Test user',
      email: 'user@test.com',
      weight: 60,
      height: 175,
      history: [],
      birthDate: 'Jan 1, 2000',
    },
    isLoading: false,
  },
};

describe('UpdatePasswordView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <UpdatePasswordView navigation={navigation} />
      </AppProvider>
    );
  });

  it('disables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <UpdatePasswordView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) =>
            node.prop('testID') === 'UpdatePasswordView.UpdatePasswordButton'
        )
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('enables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <UpdatePasswordView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'UpdatePasswordView.PasswordInput'
      )
      .first()
      .props()
      .onChangeText('Test123123.');
    wrapper
      .findWhere(
        (node) => node.prop('testID') === 'UpdatePasswordView.NewPasswordInput'
      )
      .first()
      .props()
      .onChangeText('NewTest123123.');
    wrapper
      .findWhere(
        (node) =>
          node.prop('testID') === 'UpdatePasswordView.NewPasswordRepeatInput'
      )
      .first()
      .props()
      .onChangeText('NewTest123123.');

    expect(
      wrapper
        .update()
        .findWhere(
          (node) =>
            node.prop('testID') === 'UpdatePasswordView.UpdatePasswordButton'
        )
        .first()
        .prop('disabled')
    ).toBe(false);
  });
});
