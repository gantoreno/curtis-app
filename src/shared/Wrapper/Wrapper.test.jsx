/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Wrapper from './Wrapper';
import { AppProvider } from '../../provider';

describe('Wrapper', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <Wrapper>
          <Text>Hello, world!</Text>
        </Wrapper>
      </AppProvider>
    );
  });
});
