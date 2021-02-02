import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Text, withStyles } from '@ui-kitten/components';

import { Logo, Button, Wrapper, Preloader } from '../shared';

const WelcomeView = ({ eva, navigation }) => {
  const { isLoading } = useSelector((state) => state.session);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <SafeAreaView style={eva.style.safeAreaView} testID="welcome">
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper} centered>
        <Text style={eva.style.title} category="h1">
          Welcome!{'\n'}
          This is{' '}
          <Text status="primary" category="h1">
            Curtis
          </Text>
        </Text>
        <Logo.Welcome style={eva.style.logo} />
        <Button
          style={eva.style.button}
          testID="WelcomeView.SignInButton"
          onPress={() => navigation.navigate('Sign In')}
        >
          Sign in
        </Button>
        <Text style={eva.style.hint} appearance="hint">
          Or, if you don&apos;t have an account
        </Text>
        <Button
          testID="WelcomeView.SignUpButton"
          onPress={() => navigation.navigate('Sign Up')}
          appearance="outline"
        >
          Sign up
        </Button>
      </Wrapper>
    </SafeAreaView>
  );
};

WelcomeView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(WelcomeView, () => ({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
  },
  logo: {
    marginBottom: 40,
    alignSelf: 'center',
  },
  button: {
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
}));
