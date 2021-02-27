import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Spinner, withStyles } from '@ui-kitten/components';

const Preloader = ({ eva }) => (
  <View style={eva.style.preloader}>
    <StatusBar
      translucent={false}
      backgroundColor={eva.theme['color-basic-100']}
    />
    <Spinner style={eva.style.spinner} status="primary" />
  </View>
);

Preloader.propTypes = {
  eva: PropTypes.object.isRequired,
};

export default withStyles(Preloader, () => ({
  preloader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
