import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert, Platform, SafeAreaView, ScrollView } from 'react-native';
import {
  Text,
  Icon,
  Input,
  Select,
  Layout,
  SelectItem,
  Datepicker,
  withStyles,
  IndexPath,
} from '@ui-kitten/components';

import { runDiagnosis } from '../../store/actions/sessionActions';
import { Button, Wrapper, FormLabel } from '../../shared';
import {
  parseQTcFra,
  parseSexFromIndex,
  parseCustomDateString,
  parseAgeFromDateString,
} from '../../utils/tools';
import {
  validateBirthDate,
  validateSex,
  validateWeight,
  validateHeight,
  validateHR,
  validatePd,
  validatePQ,
  validateQRS,
  validateQT,
  validateQTcFra,
} from '../../utils/validation';

const DiagnosisView = ({ eva, route, navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.session);

  const { isExternal } = route.params;

  const [name, setName] = useState(isExternal ? '' : user.name);
  const [birthDate, setBirthDate] = useState(isExternal ? '' : user.birthDate);
  const [sex, setSex] = useState(isExternal ? '' : new IndexPath(user.sex));
  const [weight, setWeight] = useState(isExternal ? '' : `${user.weight}`);
  const [height, setHeight] = useState(isExternal ? '' : `${user.height}`);
  const [HR, setHR] = useState('');
  const [Pd, setPd] = useState('');
  const [PQ, setPQ] = useState('');
  const [QRS, setQRS] = useState('');
  const [QT, setQT] = useState('');
  const [QTcFra, setQTcFra] = useState('');

  const validateFields = () =>
    validateBirthDate(birthDate) &&
    validateSex(sex.row) &&
    validateWeight(weight) &&
    validateHeight(height) &&
    validateHR(HR) &&
    validatePd(Pd) &&
    validatePQ(PQ) &&
    validateQRS(QRS) &&
    validateQT(QT) &&
    validateQTcFra(QTcFra);

  const diagnose = async () => {
    const metrics = {
      name,
      sex: sex.row,
      birthDate: isExternal ? parseCustomDateString(birthDate) : birthDate,
      age: parseAgeFromDateString(birthDate),
      weight: parseFloat(weight),
      height: parseFloat(height),
      HR: parseFloat(HR),
      Pd: parseFloat(Pd),
      PQ: parseFloat(PQ),
      QRS: parseFloat(QRS),
      QT: parseFloat(QT),
      QTcFra: QTcFra
        ? parseFloat(QTcFra)
        : parseQTcFra(parseFloat(QT), parseFloat(HR)),
    };

    dispatch(
      runDiagnosis(metrics, (diagnosis) => {
        const result = {
          date: parseCustomDateString(new Date()),
          timestamp: Date.now(),
          diagnosis,
          isExternal,
          ...metrics,
        };

        navigation.navigate('Details', {
          result,
          fromDiagnosis: true,
        });
      })
    );
  };

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
    <SafeAreaView style={eva.style.safeAreaView}>
      <StatusBar
        // style="dark"
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView>
        <Wrapper>
          <Text category="h1" style={eva.style.title}>
            ECG{'\n'}
            <Text category="h1" status="primary">
              values
            </Text>
          </Text>
          <View style={eva.style.form}>
            {isExternal && (
              <>
                <Layout style={eva.style.inputRow}>
                  <Input
                    size="large"
                    style={eva.style.input}
                    label={() => <FormLabel title="Name" />}
                    value={name}
                    testID="DiagnosisView.NameInput"
                    disabled={isLoading}
                    autoCapitalize="words"
                    onChangeText={(newName) => setName(newName)}
                  />
                </Layout>
                <Layout style={eva.style.inputRow}>
                  <Select
                    size="large"
                    style={eva.style.input}
                    label={() => <FormLabel title="Sex" required />}
                    value={parseSexFromIndex(sex.row)}
                    testID="DiagnosisView.SexInput"
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
                    testID="DiagnosisView.BirthDateInput"
                    disabled={isLoading}
                    onSelect={(newBirthDate) => setBirthDate(newBirthDate)}
                  />
                </Layout>
                <Layout style={eva.style.inputRow}>
                  <Input
                    size="large"
                    value={weight}
                    style={eva.style.input}
                    label={() => (
                      <FormLabel unit="kg" title="Weight" required />
                    )}
                    testID="DiagnosisView.WeightInput"
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
                    label={() => (
                      <FormLabel unit="cm" title="Height" required />
                    )}
                    testID="DiagnosisView.HeightInput"
                    disabled={isLoading}
                    keyboardType="numeric"
                    onChangeText={(newHeight) => setHeight(newHeight)}
                  />
                </Layout>
              </>
            )}
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={HR}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="bpm" title="HR" required />}
                testID="DiagnosisView.HRInput"
                caption="Heart rate"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newHR) => setHR(newHR)}
              />
              <Input
                size="large"
                value={Pd}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="ms" title="Pd" required />}
                testID="DiagnosisView.PdInput"
                caption="T to P segment distance"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newPd) => setPd(newPd)}
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={PQ}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="ms" title="PQ" required />}
                testID="DiagnosisView.PQInput"
                caption="PQ interval"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newPQ) => setPQ(newPQ)}
              />
              <Input
                size="large"
                value={QRS}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="ms" title="QRS" required />}
                testID="DiagnosisView.QRSInput"
                caption="QRS interval"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newQRS) => setQRS(newQRS)}
              />
            </Layout>
            <Layout style={eva.style.inputRow}>
              <Input
                size="large"
                value={QT}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="ms" title="QT" required />}
                testID="DiagnosisView.QTInput"
                caption="QT interval"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newQT) => setQT(newQT)}
              />
              <Input
                size="large"
                value={QTcFra}
                style={eva.style.halfWidthInput}
                label={() => <FormLabel unit="ms" title="QTcFra" />}
                testID="DiagnosisView.QTcFraInput"
                caption="Framingham's corrected QT"
                disabled={isLoading}
                captionIcon={(props) => (
                  <Icon name="alert-circle-outline" {...props} />
                )}
                keyboardType="numeric"
                onChangeText={(newQTcFra) => setQTcFra(newQTcFra)}
              />
            </Layout>
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
            testID="DiagnosisView.DiagnoseButton"
            onPress={() => diagnose()}
            disabled={isLoading || !validateFields()}
          >
            Diagnose
          </Button>
          <Button
            style={eva.style.button}
            testID="DiagnosisView.CancelButton"
            onPress={() => cancel()}
            disabled={isLoading}
            appearance="outline"
          >
            Cancel
          </Button>
          <Text style={eva.style.hint} appearance="hint">
            Keep in mind this is only an estimation, this values should only be
            taken as a reference for further investigation &amp; professional
            diagnosis.
          </Text>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

DiagnosisView.propTypes = {
  eva: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(DiagnosisView, () => ({
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 40 + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight),
    marginBottom: 40,
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
  hint: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'left',
    marginBottom: 40,
  },
  validation: {
    fontSize: 14,
    textAlign: 'left',
  },
  required: {
    fontWeight: 'bold',
  },
}));
