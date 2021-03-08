import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, withStyles } from '@ui-kitten/components';
import { Alert, SafeAreaView, TouchableHighlight } from 'react-native';

import { Logo, Button, Wrapper } from '../../shared';

const HomeView = ({ eva, navigation }) => {
  const { user } = useSelector((state) => state.session);

  const gradientColors = [
    eva.theme['color-primary-500'],
    eva.theme['color-danger-500'],
  ];

  const proceedToDiagnosis = () => {
    Alert.alert(
      'Preparing diagnosis suite',
      'Who is this diagnosis for?',
      [
        {
          text: 'For me',
          onPress: () => {
            navigation.navigate('Diagnosis', {
              isExternal: false,
            });
          },
        },
        {
          text: 'For someone else',
          onPress: () => {
            navigation.navigate('Diagnosis', {
              isExternal: true,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView testID="HomeView">
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper}>
        <Text style={eva.style.title} category="h1">
          Welcome back,{' '}
          <Text status="primary" category="h1">
            {user.name.split(' ')[0]}
          </Text>
        </Text>
        <LinearGradient style={eva.style.curtisButton} colors={gradientColors}>
          <TouchableHighlight
            style={eva.style.touchableHighlight}
            testID="HomeView.CurtisButton"
            onPress={() => proceedToDiagnosis()}
            underlayColor={eva.theme['color-danger-500']}
          >
            <Logo.Inverse style={eva.style.logoInverse} />
          </TouchableHighlight>
        </LinearGradient>
        <Text style={eva.style.hint} appearance="hint">
          Tap the big{' '}
          <Text style={eva.style.strongHint} status="primary">
            Curtis
          </Text>{' '}
          button to get started. Make sure to have your{' '}
          <Text style={eva.style.strongHint} status="primary">
            ECG
          </Text>{' '}
          values ready.
        </Text>
        <Button
          testID="HomeView.ViewHistoryButton"
          onPress={() => navigation.navigate('History')}
        >
          View history
        </Button>
      </Wrapper>
    </SafeAreaView>
  );
};

HomeView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(HomeView, () => ({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
  },
  touchableHighlight: {
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curtisButton: {
    width: 280,
    height: 280,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 140,
  },
  logoInverse: {
    zIndex: 100,
  },
  hint: {
    textAlign: 'left',
    marginBottom: 40,
  },
  strongHint: {
    fontWeight: 'bold',
  },
}));
