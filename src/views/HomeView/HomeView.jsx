import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, withStyles } from '@ui-kitten/components';
import { View, SafeAreaView, TouchableHighlight } from 'react-native';

import { Logo, Button, Wrapper } from '../../shared';

const DiagnosisDialog = ({ visible, onOwn, onExternal }) => (
  <View>
    <Dialog.Container visible={visible}>
      <Dialog.Title>Preparing diagnosis suite</Dialog.Title>
      <Dialog.Description>
        What is the type of this diagnosis?
      </Dialog.Description>
      <Dialog.Button
        label="Own"
        testID="HomeView.DiagnosisDialog.OwnButton"
        onPress={() => onOwn()}
      />
      <Dialog.Button
        label="External"
        testID="HomeView.DiagnosisDialog.ExternalButton"
        onPress={() => onExternal()}
      />
    </Dialog.Container>
  </View>
);

DiagnosisDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOwn: PropTypes.func.isRequired,
  onExternal: PropTypes.func.isRequired,
};

const HomeView = ({ eva, navigation }) => {
  const { user } = useSelector((state) => state.session);

  const [isDiagnosisDialogVisible, setIsDiagnosisDialogVisible] = useState(
    false
  );

  return (
    <SafeAreaView testID="HomeView">
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper}>
        <DiagnosisDialog
          visible={isDiagnosisDialogVisible}
          onOwn={() => {
            setIsDiagnosisDialogVisible(false);
            navigation.navigate('Diagnosis', {
              isExternal: false,
            });
          }}
          onExternal={() => {
            setIsDiagnosisDialogVisible(false);
            navigation.navigate('Diagnosis', {
              isExternal: true,
            });
          }}
        />
        <Text style={eva.style.title} category="h1">
          Welcome back,{' '}
          <Text status="primary" category="h1">
            {user.name.split(' ')[0]}
          </Text>
        </Text>
        <LinearGradient
          style={eva.style.curtisButton}
          colors={[
            eva.theme['color-primary-500'],
            eva.theme['color-danger-500'],
          ]}
        >
          <TouchableHighlight
            style={eva.style.touchableHighlight}
            testID="HomeView.CurtisButton"
            onPress={() => setIsDiagnosisDialogVisible(true)}
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
