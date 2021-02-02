import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

import { SignUpView, SignInView, WelcomeView, OneMoreStepView } from '../views';

const AuthNavigator = ({ eva }) => {
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
      initialRouteName="Welcome"
    >
      <Screen name="Sign In" component={SignInView} />
      <Screen name="Sign Up" component={SignUpView} />
      <Screen name="Welcome" component={WelcomeView} />
      <Screen name="One More Step" component={OneMoreStepView} />
    </Navigator>
  );
};

AuthNavigator.propTypes = {
  eva: PropTypes.object.isRequired,
};

export default withStyles(AuthNavigator);
