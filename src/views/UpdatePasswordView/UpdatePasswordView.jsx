import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Input, Icon, Layout, withStyles } from '@ui-kitten/components';

import { updatePassword } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import {
  validatePassword,
  validatePasswordRepeat,
} from '../../utils/validation';

const UpdatePasswordView = ({ eva, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const validateFields = () =>
    validatePassword(password) &&
    validatePassword(newPassword) &&
    validatePasswordRepeat(newPassword, newPasswordRepeat) &&
    password !== newPassword;

  const cancel = () => {
    Alert.alert('Confirm', 'Are you sure you want to cancel?', [
      { text: 'No, stay' },
      {
        text: 'Yes, take me out',
        style: 'destructive',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
        <Wrapper>
          <Text style={eva.style.title} category="h1">
            Update your{'\n'}
            <Text status="primary" category="h1">
              password
            </Text>
          </Text>
          <View style={eva.style.form}>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={password}
                style={eva.style.input}
                label={() => <FormLabel title="Current password" required />}
                testID="UpdatePasswordView.PasswordInput"
                disabled={isLoading}
                onChangeText={(pass) => setPassword(pass)}
                accessoryRight={({ ...rest }) => (
                  <TouchableWithoutFeedback
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
                  >
                    <Icon
                      {...rest}
                      name={isSecureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableWithoutFeedback>
                )}
                autoCapitalize="none"
                secureTextEntry={isSecureTextEntry}
                autoCompleteType="off"
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={newPassword}
                style={eva.style.input}
                label={() => <FormLabel title="New password" required />}
                testID="UpdatePasswordView.NewPasswordInput"
                disabled={isLoading}
                onChangeText={(newPass) => setNewPassword(newPass)}
                accessoryRight={({ ...rest }) => (
                  <TouchableWithoutFeedback
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
                  >
                    <Icon
                      {...rest}
                      name={isSecureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableWithoutFeedback>
                )}
                autoCapitalize="none"
                secureTextEntry={isSecureTextEntry}
                autoCompleteType="off"
              />
            </Layout>
            <Layout>
              <Input
                size="large"
                value={newPasswordRepeat}
                style={eva.style.input}
                label={() => <FormLabel title="Repeat new password" required />}
                testID="UpdatePasswordView.NewPasswordRepeatInput"
                disabled={isLoading}
                onChangeText={(newPassRepeat) =>
                  setNewPasswordRepeat(newPassRepeat)
                }
                accessoryRight={({ ...rest }) => (
                  <TouchableWithoutFeedback
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
                  >
                    <Icon
                      {...rest}
                      name={isSecureTextEntry ? 'eye-off' : 'eye'}
                    />
                  </TouchableWithoutFeedback>
                )}
                autoCapitalize="none"
                secureTextEntry={isSecureTextEntry}
                autoCompleteType="off"
              />
            </Layout>
          </View>
          <Button
            style={eva.style.button}
            testID="UpdatePasswordView.UpdatePasswordButton"
            disabled={isLoading || !validateFields()}
            onPress={() =>
              dispatch(
                updatePassword(password, newPassword, (err) => {
                  if (err) {
                    Alert.alert('Error', err.message);
                    return;
                  }

                  navigation.goBack();
                })
              )
            }
          >
            Save password
          </Button>
          <Button
            testID="UpdatePasswordView.CancelButton"
            onPress={() => cancel()}
            appearance="outline"
          >
            Cancel
          </Button>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

UpdatePasswordView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(UpdatePasswordView, () => ({
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  scrollView: {
    height: '100%',
  },
  wrapper: {
    paddingBottom: 25,
  },
  form: {
    marginBottom: 40,
  },
  input: {
    flex: 1,
  },
  inputRow: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 20,
  },
}));
