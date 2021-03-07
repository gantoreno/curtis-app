/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import HistoryView from './HistoryView';
import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockState = {
  session: {
    user: {
      sex: 0,
      name: 'Test user',
      email: 'user@test.com',
      weight: 60,
      height: 175,
      history: [
        {
          date: 'Jan 1, 2021',
          name: 'Test user',
          email: 'user@test.com',
          weight: 60,
          height: 175,
          birthDate: 'Jan 1, 2000',
          isExternal: false,
          diagnosis: 'Sinus tachycardia with short PQ',
          HR: 133,
          Pd: 80,
          PQ: 96,
          QRS: 102,
          QT: 304,
          QTcFra: 389,
        },
      ],
      birthDate: 'Jan 1, 2000',
    },
    isLoading: false,
  },
};

describe('HistoryView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <HistoryView navigation={navigation} />
      </AppProvider>
    );
  });

  it('contains one history card', async () => {
    const wrapper = mount(
      <AppProvider>
        <HistoryView navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'HistoryView.HistoryCard')
        .first()
    ).toBeDefined();
  });

  it('navigates to details on button press', async () => {
    const wrapper = mount(
      <AppProvider>
        <HistoryView navigation={navigation} />
      </AppProvider>
    );

    wrapper
      .findWhere((node) => node.prop('testID') === 'HistoryView.HistoryCard')
      .find('Button')
      .first()
      .simulate('click');

    expect(navigation.navigate).toHaveBeenCalled();
  });
});
