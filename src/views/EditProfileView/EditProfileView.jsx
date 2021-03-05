import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, SafeAreaView } from 'react-native';
import {
  Text,
  Input,
  Select,
  Layout,
  IndexPath,
  SelectItem,
  Datepicker,
  withStyles,
} from '@ui-kitten/components';

import { editUser } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import { parseSexFromIndex, parseCustomDateString } from '../../utils/tools';
import {
  validateName,
  validateSex,
  validateEmail,
  validateWeight,
  validateHeight,
  validateBirthDate,
} from '../../utils/validation';

const EditProfileView = ({ eva, navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.session);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(new Date(user.birthDate));
  const [sex, setSex] = useState(new IndexPath(user.sex));
  const [weight, setWeight] = useState(`${user.weight}`);
  const [height, setHeight] = useState(`${user.height}`);

  const validateFields = () =>
    validateName(name) &&
    validateEmail(email) &&
    validateBirthDate(birthDate) &&
    validateSex(sex.row) &&
    validateWeight(weight) &&
    validateHeight(height);

  return (
    <SafeAreaView>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
        <Wrapper style={eva.style.wrapper}>
          <Text style={eva.style.title} category="h1">
            Edit your{'\n'}
            <Text status="primary" category="h1">
              profile
            </Text>
          </Text>
          <View style={eva.style.form}>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={name}
                style={eva.style.input}
                label={() => <FormLabel title="Name" required />}
                testID="EditProfileView.Input-name"
                disabled={isLoading}
                keyboardType="email-address"
                onChangeText={(newName) => setName(newName)}
                autoCapitalize="words"
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Select
                size="large"
                style={eva.style.input}
                label={() => <FormLabel title="Sex" required />}
                value={parseSexFromIndex(sex.row)}
                testID="EditProfileView.Input-sex"
                disabled={isLoading}
                onSelect={(newSex) => setSex(newSex)}
                selectedIndex={sex}
              >
                <SelectItem title="Male" />
                <SelectItem title="Female" />
              </Select>
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Datepicker
                size="large"
                min={new Date(1910, 0, 1)}
                date={birthDate}
                style={eva.style.input}
                label={() => <FormLabel title="Birth date" required />}
                testID="EditProfileView.Input-birthDate"
                disabled={isLoading}
                onSelect={(newBirthDate) => setBirthDate(newBirthDate)}
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={weight}
                style={eva.style.input}
                label={() => <FormLabel unit="kg" title="Weight" required />}
                testID="EditProfileView.Input-weight"
                disabled={isLoading}
                keyboardType="numeric"
                onChangeText={(newWeight) => setWeight(newWeight)}
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={height}
                style={eva.style.input}
                label={() => <FormLabel unit="cm" title="Height" required />}
                testID="EditProfileView.Input-height"
                disabled={isLoading}
                keyboardType="numeric"
                onChangeText={(newHeight) => setHeight(newHeight)}
              />
            </Layout>
            <Layout>
              <Input
                size="large"
                value={email}
                style={eva.style.input}
                label={() => <FormLabel title="Email" required />}
                testID="EditProfileView.Input-email"
                disabled={isLoading}
                keyboardType="email-address"
                onChangeText={(newEmail) => setEmail(newEmail)}
                autoCapitalize="none"
              />
            </Layout>
          </View>
          <Button
            style={eva.style.button}
            testID="EditProfileView.SaveChangesButton"
            onPress={() =>
              dispatch(
                editUser(
                  name,
                  sex.row,
                  parseCustomDateString(birthDate),
                  weight,
                  height,
                  email,
                  () => {
                    navigation.goBack();
                  }
                )
              )
            }
            disabled={isLoading || !validateFields()}
          >
            Save changes
          </Button>
          <Button
            style={eva.style.button}
            testID="EditProfileView.UpdatePasswordButton"
            appearance="outline"
          >
            Update password
          </Button>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

EditProfileView.propTypes = {
  eva: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(EditProfileView, () => ({
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
  halfWidthInput: {
    width: '47%',
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
