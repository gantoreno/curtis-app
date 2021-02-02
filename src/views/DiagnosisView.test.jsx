/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import DiagnosisView from './DiagnosisView';
import { navigation } from '../../__mocks__';
import { AppProvider } from '../provider';

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
const mockRoute = {
  params: {
    isExternal: false,
  },
};

describe('DiagnosisView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <DiagnosisView route={mockRoute} navigation={navigation} />
      </AppProvider>
    );
  });

  it('disables button by default', async () => {
    const wrapper = mount(
      <AppProvider>
        <DiagnosisView route={mockRoute} navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DiagnosisView.DiagnoseButton'
        )
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('enables button on valid input', async () => {
    const wrapper = mount(
      <AppProvider>
        <DiagnosisView route={mockRoute} navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-HR')
      .first()
      .props()
      .onChangeText('133');
    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-Pd')
      .first()
      .props()
      .onChangeText('80');
    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-PQ')
      .first()
      .props()
      .onChangeText('96');
    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-QRS')
      .first()
      .props()
      .onChangeText('102');
    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-QT')
      .first()
      .props()
      .onChangeText('304');
    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.Input-QTcFra')
      .first()
      .props()
      .onChangeText('389');

    expect(
      wrapper
        .update()
        .findWhere(
          (node) => node.prop('testID') === 'DiagnosisView.DiagnoseButton'
        )
        .first()
        .prop('disabled')
    ).toBe(false);
  });

  it('opens alert on cancel out button press', async () => {
    const wrapper = mount(
      <AppProvider>
        <DiagnosisView route={mockRoute} navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'DiagnosisView.CancelButton')
      .first()
      .simulate('click');

    expect(Alert.alert).toHaveBeenCalled();
  });
});
