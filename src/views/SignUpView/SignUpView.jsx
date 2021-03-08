import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Icon, Input, withStyles } from '@ui-kitten/components';
import {
  View,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import { checkForEmail } from '../../store/actions/sessionActions';
import { Wrapper, Button, FormLabel } from '../../shared';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordRepeat,
} from '../../utils/validation';

const SignUpView = ({ eva, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const validateFields = () =>
    validateName(name) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validatePasswordRepeat(password, passwordRepeat);

  return (
    <SafeAreaView style={eva.style.safeAreaView}>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper} centered>
        <Text category="h1" style={eva.style.title}>
          Create a{'\n'}
          <Text category="h1" status="primary">
            Curtis
          </Text>{' '}
          account
        </Text>
        <View style={eva.style.form}>
          <Input
            size="large"
            value={name}
            style={eva.style.input}
            testID="SignUpView.NameInput"
            label={() => <FormLabel title="Name" required />}
            onChangeText={(newName) => setName(newName)}
            autoCapitalize="words"
          />
          <Input
            size="large"
            value={email}
            style={eva.style.input}
            testID="SignUpView.EmailInput"
            label={() => <FormLabel title="E-mail" required />}
            keyboardType="email-address"
            onChangeText={(newEmail) => setEmail(newEmail)}
            autoCapitalize="none"
            autoCompleteType="off"
          />
          <Input
            size="large"
            value={password}
            style={eva.style.input}
            label={() => <FormLabel title="Password" required />}
            testID="SignUpView.PasswordInput"
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
            autoCompleteType="off"
          />
          <Input
            size="large"
            value={passwordRepeat}
            style={eva.style.input}
            label={() => <FormLabel title="Repeat password" required />}
            testID="SignUpView.PasswordRepeatInput"
            onChangeText={(newPasswordRepeat) =>
              setPasswordRepeat(newPasswordRepeat)
            }
            accessoryRight={({ ...rest }) => (
              <TouchableWithoutFeedback
                onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
              >
                <Icon {...rest} name={isSecureTextEntry ? 'eye-off' : 'eye'} />
              </TouchableWithoutFeedback>
            )}
            autoCapitalize="none"
            secureTextEntry={isSecureTextEntry}
            autoCompleteType="off"
          />
          <Text style={eva.style.validation} appearance="hint">
            All fields marked with a{' '}
            <Text style={eva.style.required} status="primary">
              *
            </Text>{' '}
            are{' '}
            <Text style={eva.style.required} status="primary">
              required
            </Text>
            .
          </Text>
        </View>
        <Button
          style={eva.style.button}
          testID="SignUpView.SignUpButton"
          onPress={() =>
            dispatch(
              checkForEmail(email, (err) => {
                if (err) {
                  Alert.alert('Error', err.message);
                  return;
                }

                navigation.navigate('One More Step', {
                  name,
                  email,
                  password,
                });
              })
            )
          }
          disabled={isLoading || !validateFields()}
          appearance="outline"
        >
          Sign up
        </Button>
        <Text style={eva.style.hint} appearance="hint">
          Already have an account?{' '}
          <TouchableWithoutFeedback
            testID="SignUpView.SignInRedirect"
            onPress={() => navigation.navigate('Sign In')}
          >
            <Text style={eva.style.required} status="primary">
              Sign in
            </Text>
          </TouchableWithoutFeedback>{' '}
          instead.
        </Text>
      </Wrapper>
    </SafeAreaView>
  );
};

SignUpView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(SignUpView, () => ({
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  required: {
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 40,
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  validation: {
    fontSize: 14,
    textAlign: 'left',
  },
}));
