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
          (node) => node.prop('testID') === 'ProfileView.NameDataEntry'
        )
        .first()
        .text()
    ).toMatch(/test user/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'ProfileView.AgeDataEntry')
        .first()
        .text()
    ).toMatch(/21/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.WeightDataEntry'
        )
        .first()
        .text()
    ).toMatch(/60/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.HeightDataEntry'
        )
        .first()
        .text()
    ).toMatch(/175/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.BirthDateDataEntry'
        )
        .first()
        .text()
    ).toMatch(/jan 1, 2000/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'ProfileView.EmailDataEntry'
        )
        .first()
        .text()
    ).toMatch(/user@test\.com/i);
  });
});
