/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import WelcomeView from './WelcomeView';
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

describe('WelcomeView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <WelcomeView navigation={navigation} />
      </AppProvider>
    );
  });

  it('navigates on button press', async () => {
    const wrapper = mount(
      <AppProvider>
        <WelcomeView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'WelcomeView.SignInButton')
      .first()
      .simulate('click');
    wrapper
      .findWhere((node) => node.prop('testID') === 'WelcomeView.SignUpButton')
      .first()
      .simulate('click');

    expect(navigation.navigate).toHaveBeenCalledTimes(2);
  });
});
