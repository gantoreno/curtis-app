/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import HomeView from './HomeView';
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

describe('HomeView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <HomeView navigation={navigation} />
      </AppProvider>
    );
  });
});
