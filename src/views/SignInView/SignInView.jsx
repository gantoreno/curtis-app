import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
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

import { signIn, resetPassword } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import { validateEmail, validatePassword } from '../../utils/validation';

const PasswordResetDialog = ({
  visible,
  value,
  onChangeText,
  onAccept,
  onCancel,
  disabled,
}) => (
  <View>
    <Dialog.Container visible={visible}>
      <Dialog.Title>Password Reset E-mail</Dialog.Title>
      <Dialog.Description>
        Please provide the e-mail associated with your account, if it&apos;s
        valid, you&apos;ll receive a password reset link.
      </Dialog.Description>
      <Dialog.Input
        value={value}
        placeholder="email@example.com"
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Dialog.Button label="Cancel" onPress={() => onCancel()} />
      <Dialog.Button
        label="Send"
        onPress={() => onAccept()}
        disabled={disabled}
      />
    </Dialog.Container>
  </View>
);

PasswordResetDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const SignInView = ({ eva, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');

  const validateFields = () =>
    validateEmail(email) && validatePassword(password);

  return (
    <SafeAreaView style={eva.style.safeAreaView}>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper} centered>
        <PasswordResetDialog
          value={confirmationEmail}
          visible={isVisible}
          onChangeText={(newConfirmationEmail) =>
            setConfirmationEmail(
              newConfirmationEmail.replaceAll(/\s/g, '').replaceAll(/\t/g, '')
            )
          }
          onAccept={() =>
            dispatch(
              resetPassword(confirmationEmail, (err) => {
                if (err) {
                  Alert.alert('Error', err.message);
                  return;
                }

                setIsVisible(false);
                setConfirmationEmail('');
              })
            )
          }
          onCancel={() => {
            setIsVisible(false);
            setConfirmationEmail('');
          }}
          disabled={isLoading || !validateEmail(confirmationEmail)}
        />
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
            testID="SignInView.EmailInput"
            disabled={isLoading}
            keyboardType="email-address"
            onChangeText={(newEmail) => setEmail(newEmail)}
            autoCapitalize="none"
          />
          <Input
            size="large"
            value={password}
            style={eva.style.input}
            label={() => <FormLabel title="Password" />}
            testID="SignInView.PasswordInput"
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
          <TouchableWithoutFeedback>
            <Text
              style={eva.style.passwordResetLink}
              status="primary"
              onPress={() => setIsVisible(true)}
            >
              Forgot your password?
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Button
          style={eva.style.button}
          testID="SignInView.SignInButton"
          onPress={() =>
            dispatch(
              signIn(email, password, (err) => {
                if (err) {
                  Alert.alert('Error', err.message);
                }
              })
            )
          }
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
  passwordResetLink: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  alternative: {
    fontWeight: 'bold',
  },
}));
