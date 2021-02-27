import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Icon, Input, withStyles } from '@ui-kitten/components';
import { View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import { signIn } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import { validateEmail, validatePassword } from '../../utils/validation';

const SignInView = ({ eva, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const validateFields = () =>
    validateEmail(email) && validatePassword(password);

  return (
    <SafeAreaView style={eva.style.safeAreaView}>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper} centered>
        <Text style={eva.style.title} category="h1">
          Sign in to{'\n'}your{' '}
          <Text status="primary" category="h1">
            Curtis
          </Text>{' '}
          account
        </Text>
        <View style={eva.style.form}>
          <Input
            size="large"
            value={email}
            style={eva.style.input}
            label={() => <FormLabel title="E-mail" />}
            testID="SignInView.Input-email"
            disabled={isLoading}
            keyboardType="email-address"
            onChangeText={(newEmail) => setEmail(newEmail)}
            autoCapitalize="none"
          />
          <Input
            size="large"
            value={password}
            label={() => <FormLabel title="Password" />}
            testID="SignInView.Input-password"
            disabled={isLoading}
            onChangeText={(newPassword) => setPassword(newPassword)}
            accessoryRight={({ ...rest }) => (
              <TouchableWithoutFeedback
                onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
              >
                <Icon {...rest} name={isSecureTextEntry ? 'eye-off' : 'eye'} />
              </TouchableWithoutFeedback>
            )}
            autoCapitalize="none"
            secureTextEntry={isSecureTextEntry}
          />
        </View>
        <Button
          style={eva.style.button}
          testID="SignInView.SignInButton"
          onPress={() => dispatch(signIn(email, password))}
          disabled={isLoading || !validateFields()}
        >
          Sign in
        </Button>
        <Text style={eva.style.hint} appearance="hint">
          Don&apos;t have an account?{' '}
          <TouchableWithoutFeedback
            testID="SignInView.SignUpRedirect"
            onPress={() => navigation.navigate('Sign Up')}
          >
            <Text style={eva.style.alternative} status="primary">
              Sign up
            </Text>
          </TouchableWithoutFeedback>{' '}
          instead.
        </Text>
      </Wrapper>
    </SafeAreaView>
  );
};

SignInView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(SignInView, () => ({
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
  form: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 40,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  alternative: {
    fontWeight: 'bold',
  },
}));
