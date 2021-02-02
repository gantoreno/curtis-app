/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Button from './Button';
import { AppProvider } from '../provider';

describe('Button', () => {
  it('renders without crashing', async () => {
    shallow(
      <AppProvider>
        <Button>Hello, world!</Button>
      </AppProvider>
    );
  });

  it('can be disabled', async () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <AppProvider>
        <Button onClick={onClick} disabled>
          Hello, world!
        </Button>
      </AppProvider>
    );

    expect(wrapper.find('Button').first().prop('disabled')).toBe(true);
    wrapper.find('Button').first().simulate('click');
    expect(onClick.mock.calls.length).toBe(0);
  });
});
