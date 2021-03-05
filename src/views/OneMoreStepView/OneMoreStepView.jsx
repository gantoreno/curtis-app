import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  Input,
  Select,
  SelectItem,
  Datepicker,
  withStyles,
} from '@ui-kitten/components';

import { signUp } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import { parseSexFromIndex, parseCustomDateString } from '../../utils/tools';
import {
  validateSex,
  validateWeight,
  validateHeight,
  validateBirthDate,
} from '../../utils/validation';

const OneMoreStepView = ({ eva, route }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const { name, email, password } = route.params;

  const [sex, setSex] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  const validateFields = () =>
    validateSex(sex.row) &&
    validateBirthDate(birthDate) &&
    validateWeight(weight) &&
    validateHeight(height);

  return (
    <SafeAreaView style={eva.style.safeAreaView}>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <Wrapper style={eva.style.wrapper} centered>
        <Text category="h1" style={eva.style.title}>
          One more{' '}
          <Text category="h1" status="primary">
            step
          </Text>
          !
        </Text>
        <View style={eva.style.form}>
          <Select
            size="large"
            style={eva.style.input}
            label={() => <FormLabel title="Sex" required />}
            value={parseSexFromIndex(sex.row)}
            testID="OneMoreStepView.Input-sex"
            onSelect={(newSex) => setSex(newSex)}
            disabled={isLoading}
            selectedIndex={sex}
          >
            <SelectItem title="Male" />
            <SelectItem title="Female" />
          </Select>
          <Datepicker
            min={new Date(1910, 0, 1)}
            size="large"
            date={birthDate}
            style={eva.style.input}
            label={() => <FormLabel title="Birth date" required />}
            testID="OneMoreStepView.Input-birthDate"
            disabled={isLoading}
            onSelect={(newBirthDate) => setBirthDate(newBirthDate)}
          />
          <Input
            size="large"
            value={weight}
            style={eva.style.input}
            label={() => <FormLabel unit="kg" title="Weight" required />}
            testID="OneMoreStepView.Input-weight"
            disabled={isLoading}
            keyboardType="numeric"
            onChangeText={(newWeight) => setWeight(newWeight)}
          />
          <Input
            size="large"
            value={height}
            style={eva.style.input}
            label={() => <FormLabel unit="cm" title="Height" required />}
            testID="OneMoreStepView.Input-height"
            disabled={isLoading}
            keyboardType="numeric"
            onChangeText={(newHeight) => setHeight(newHeight)}
          />
          <Text appearance="hint" style={eva.style.validation}>
            All fields marked with a{' '}
            <Text status="primary" style={eva.style.required}>
              *
            </Text>{' '}
            are{' '}
            <Text status="primary" style={eva.style.required}>
              required
            </Text>
            .
          </Text>
        </View>
        <Button
          style={eva.style.button}
          testID="OneMoreStepView.SignUpButton"
          onPress={() =>
            dispatch(
              signUp(
                name,
                email,
                password,
                sex.row,
                parseCustomDateString(birthDate),
                weight,
                height
              )
            )
          }
          disabled={!validateFields() || isLoading}
          appearance="outline"
        >
          Create my account
        </Button>
      </Wrapper>
    </SafeAreaView>
  );
};

OneMoreStepView.propTypes = {
  eva: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default withStyles(OneMoreStepView, () => ({
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
  validation: {
    fontSize: 14,
    textAlign: 'left',
  },
}));
