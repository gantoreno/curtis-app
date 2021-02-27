import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import store from '../../store';
import theme from '../../theme/custom-theme.json';
import mapping from '../../mapping/custom-mapping.json';

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme.light }}
      customMapping={mapping}
    >
      {children}
    </ApplicationProvider>
  </Provider>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
