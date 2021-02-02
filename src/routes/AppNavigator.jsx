import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigator from './HomeNavigator';
import { DiagnosisView, DetailsView } from '../views';

const AppNavigator = ({ eva }) => {
  const { Navigator, Screen } = createStackNavigator();

  const screenOptions = {
    cardStyle: {
      backgroundColor: eva.theme['color-basic-100'],
    },
  };

  return (
    <Navigator
      headerMode="none"
      screenOptions={screenOptions}
      initialRouteName="Home"
    >
      <Screen name="Home" component={HomeNavigator} />
      <Screen name="Details" component={DetailsView} />
      <Screen name="Diagnosis" component={DiagnosisView} />
    </Navigator>
  );
};

AppNavigator.propTypes = {
  eva: PropTypes.object.isRequired,
};

export default withStyles(AppNavigator);
