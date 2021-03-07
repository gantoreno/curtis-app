/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';
import EditProfileView from './EditProfileView';

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

describe('EditProfileView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <EditProfileView navigation={navigation} />
      </AppProvider>
    );
  });

  it('contains all the user data', async () => {
    const wrapper = mount(
      <AppProvider>
        <EditProfileView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.NameInput'
        )
        .first()
        .prop('value')
    ).toBe(mockState.session.user.name);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'EditProfileView.SexInput')
        .first()
        .prop('selectedIndex').row
    ).toBe(mockState.session.user.sex);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.BirthDateInput'
        )
        .first()
        .prop('date')
    ).toEqual(new Date(mockState.session.user.birthDate));
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.WeightInput'
        )
        .first()
        .prop('value')
    ).toBe(`${mockState.session.user.weight}`);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.HeightInput'
        )
        .first()
        .prop('value')
    ).toBe(`${mockState.session.user.height}`);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.EmailInput'
        )
        .first()
        .prop('value')
    ).toBe(`${mockState.session.user.email}`);
  });

  it('enables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <EditProfileView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.SaveChangesButton'
        )
        .first()
        .prop('disabled')
    ).toBe(false);
  });

  it('disables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <EditProfileView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'EditProfileView.NameInput')
      .first()
      .props()
      .onChangeText('');

    expect(
      wrapper
        .update()
        .findWhere(
          (node) => node.prop('testID') === 'EditProfileView.SaveChangesButton'
        )
        .first()
        .prop('disabled')
    ).toBe(true);
  });
});
