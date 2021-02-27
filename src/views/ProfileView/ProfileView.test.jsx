/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import ProfileView from './ProfileView';
import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';

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

describe('ProfileView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <ProfileView navigation={navigation} />
      </AppProvider>
    );
  });

  it('contains all data entries', async () => {
    const wrapper = mount(
      <AppProvider>
        <ProfileView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-name'
        )
        .first()
        .text()
    ).toMatch(/test user/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-age'
        )
        .first()
        .text()
    ).toMatch(/21/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-weight'
        )
        .first()
        .text()
    ).toMatch(/60/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-height'
        )
        .first()
        .text()
    ).toMatch(/175/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-birthDate'
        )
        .first()
        .text()
    ).toMatch(/jan 1, 2000/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.DataEntry-email'
        )
        .first()
        .text()
    ).toMatch(/user@test\.com/i);
  });

  it('opens alert on sign out button press', async () => {
    const wrapper = mount(
      <AppProvider>
        <ProfileView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'ProfileView.SignOutButton')
      .first()
      .simulate('click');

    expect(Alert.alert).toHaveBeenCalled();
  });
});
