/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import DetailsView from './DetailsView';
import { navigation } from '../../../__mocks__';
import { AppProvider } from '../../provider';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

const mockState = {
  session: {
    isLoading: false,
  },
};
const mockRoute1 = {
  params: {
    result: {
      sex: 0,
      date: 'Jan 1, 2021',
      name: 'Test user',
      email: 'user@test.com',
      weight: 60,
      height: 175,
      birthDate: 'Jan 1, 2000',
      isExternal: true,
      diagnosis: 'Sinus tachycardia with short PQ',
      HR: 133,
      Pd: 80,
      PQ: 96,
      QRS: 102,
      QT: 304,
      QTcFra: 389,
    },
    fromDiagnosis: true,
  },
};

describe('DetailsView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockState));
  });

  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <DetailsView route={mockRoute1} navigation={navigation} />
      </AppProvider>
    );
  });

  it('contains all data entries', async () => {
    const wrapper = mount(
      <AppProvider>
        <DetailsView route={mockRoute1} navigation={navigation} />
      </AppProvider>
    );

    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DetailsView.NameDataEntry'
        )
        .first()
        .text()
    ).toMatch(/test user/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.SexDataEntry')
        .first()
        .text()
    ).toMatch(/male/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DetailsView.WeightDataEntry'
        )
        .first()
        .text()
    ).toMatch(/60/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DetailsView.HeightDataEntry'
        )
        .first()
        .text()
    ).toMatch(/175/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DetailsView.BirthDateDataEntry'
        )
        .first()
        .text()
    ).toMatch(/jan 1, 2000/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.HRDataEntry')
        .first()
        .text()
    ).toMatch(/133/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.PdDataEntry')
        .first()
        .text()
    ).toMatch(/80/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.PQDataEntry')
        .first()
        .text()
    ).toMatch(/96/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.QRSDataEntry')
        .first()
        .text()
    ).toMatch(/102/i);
    expect(
      wrapper
        .findWhere((node) => node.prop('testID') === 'DetailsView.QTDataEntry')
        .first()
        .text()
    ).toMatch(/304/i);
    expect(
      wrapper
        .findWhere(
          (node) => node.prop('testID') === 'DetailsView.QTcFraDataEntry'
        )
        .first()
        .text()
    ).toMatch(/389/i);
  });
});
