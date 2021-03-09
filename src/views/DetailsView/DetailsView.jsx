import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { Text, withStyles } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import {
  saveDiagnosis,
  deleteDiagnosis,
} from '../../store/actions/sessionActions';
import { Tag, Button, Wrapper, DataEntry } from '../../shared';
import { parseSexFromIndex, parseAgeFromDateString } from '../../utils/tools';

const DiscardDiagnosisDialog = ({ visible, onNo, onYes }) => (
  <View>
    <Dialog.Container visible={visible}>
      <Dialog.Title>Confirm</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to discard this diagnosis?
      </Dialog.Description>
      <Dialog.Button
        label="No"
        testID="DetailsView.DiscardDiagnosisDialog.NoButton"
        onPress={() => onNo()}
      />
      <Dialog.Button
        label="Yes"
        style={{ color: 'red' }}
        testID="DetailsView.DiscardDiagnosisDialog.YesButton"
        onPress={() => onYes()}
      />
    </Dialog.Container>
  </View>
);

DiscardDiagnosisDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onNo: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
};

const DeleteDiagnosisDialog = ({ visible, onNo, onYes }) => (
  <View>
    <Dialog.Container visible={visible}>
      <Dialog.Title>Confirm</Dialog.Title>
      <Dialog.Description>
        Are you sure you want to delete this diagnosis?
      </Dialog.Description>
      <Dialog.Button
        label="No"
        testID="DetailsView.DeleteDiagnosisDialog.NoButton"
        onPress={() => onNo()}
      />
      <Dialog.Button
        label="Yes"
        style={{ color: 'red' }}
        testID="DetailsView.DeleteDiagnosisDialog.YesButton"
        onPress={() => onYes()}
      />
    </Dialog.Container>
  </View>
);

DeleteDiagnosisDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onNo: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
};

const DetailsView = ({ eva, navigation, route }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const { result, fromDiagnosis = false } = route.params;

  const [
    isDiscardDiagnosisDialogVisible,
    setIsDiscardDiagnosisDialogVisible,
  ] = useState(false);
  const [
    isDeleteDiagnosisDialogVisible,
    setIsDeleteDiagnosisDialogVisible,
  ] = useState(false);

  return (
    <SafeAreaView testID="DetailsView">
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
        <DiscardDiagnosisDialog
          visible={isDiscardDiagnosisDialogVisible}
          onNo={() => setIsDiscardDiagnosisDialogVisible(false)}
          onYes={() => {
            setIsDiscardDiagnosisDialogVisible(false);
            navigation.navigate('Home');
          }}
        />
        <DeleteDiagnosisDialog
          visible={isDeleteDiagnosisDialogVisible}
          onNo={() => setIsDeleteDiagnosisDialogVisible(false)}
          onYes={() => {
            setIsDeleteDiagnosisDialogVisible(false);
            dispatch(
              deleteDiagnosis(result, (err) => {
                if (err) {
                  Alert.alert('Error', err.message);
                  return;
                }

                navigation.navigate('Home');
              })
            );
          }}
        />
        <Wrapper>
          <Text style={eva.style.title} category="h1">
            Analysis{'\n'}
            <Text status="primary" category="h1">
              {fromDiagnosis ? 'results' : 'details'}
            </Text>
          </Text>
          <View style={eva.style.profileData}>
            <View style={eva.style.dataRowTag}>
              <DataEntry
                label="Type"
                value={() => <Tag isExternal={result.isExternal} />}
                testID="DetailsView.TypeDataEntry"
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                label="Date"
                value={result.date}
                testID="DetailsView.DateDataEntry"
              />
            </View>
            {result.isExternal && (
              <>
                <View style={eva.style.dataRow}>
                  <DataEntry
                    label="Name"
                    value={result.name || 'N/A'}
                    testID="DetailsView.NameDataEntry"
                    halfWidth
                  />
                  <DataEntry
                    unit="years"
                    label="Age"
                    value={parseAgeFromDateString(result.birthDate)}
                    testID="DetailsView.AgeDataEntry"
                    halfWidth
                  />
                </View>
                <View style={eva.style.dataRow}>
                  <DataEntry
                    unit="kg"
                    label="Weight"
                    value={result.weight}
                    testID="DetailsView.WeightDataEntry"
                    halfWidth
                  />
                  <DataEntry
                    unit="cm"
                    label="Height"
                    value={result.height}
                    testID="DetailsView.HeightDataEntry"
                    halfWidth
                  />
                </View>
                <View style={eva.style.dataRow}>
                  <DataEntry
                    label="Sex"
                    value={parseSexFromIndex(result.sex)}
                    testID="DetailsView.SexDataEntry"
                    halfWidth
                  />
                  <DataEntry
                    label="Birth date"
                    value={result.birthDate}
                    testID="DetailsView.BirthDateDataEntry"
                    halfWidth
                  />
                </View>
              </>
            )}
            <View style={eva.style.dataRow}>
              <DataEntry
                unit="bpm"
                label="HR"
                value={result.HR}
                testID="DetailsView.HRDataEntry"
                halfWidth
              />
              <DataEntry
                unit="ms"
                label="Pd"
                value={result.Pd}
                testID="DetailsView.PdDataEntry"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                unit="ms"
                label="PQ"
                value={result.PQ}
                testID="DetailsView.PQDataEntry"
                halfWidth
              />
              <DataEntry
                unit="ms"
                label="QRS"
                value={result.QRS}
                testID="DetailsView.QRSDataEntry"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                unit="ms"
                label="QT"
                value={result.QT}
                testID="DetailsView.QTDataEntry"
                halfWidth
              />
              <DataEntry
                unit="ms"
                label="QTcFra"
                value={result.QTcFra}
                testID="DetailsView.QTcFraDataEntry"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                label="Diagnosis"
                value={result.diagnosis}
                testID="DetailsView.diagnosisDataEntry"
              />
            </View>
          </View>
          {fromDiagnosis ? (
            <>
              <Button
                style={eva.style.saveButton}
                testID="DetailsView.SaveButton"
                onPress={() =>
                  dispatch(
                    saveDiagnosis(result, (err) => {
                      if (err) {
                        Alert.alert('Error', err.message);
                        return;
                      }

                      navigation.navigate('Home');
                    })
                  )
                }
                disabled={isLoading}
              >
                Save
              </Button>
              <Button
                style={eva.style.discardButton}
                testID="DetailsView.DiscardButton"
                onPress={() => setIsDiscardDiagnosisDialogVisible(true)}
                disabled={isLoading}
                appearance="outline"
              >
                Discard
              </Button>
            </>
          ) : (
            <>
              <Button
                style={eva.style.discardButton}
                testID="DetailsView.GoBackButton"
                status={
                  result.diagnosis === 'No signs of abnormality'
                    ? 'info'
                    : 'primary'
                }
                onPress={() => navigation.goBack()}
              >
                Go back
              </Button>
              <Button
                style={eva.style.deleteButton}
                testID="DetailsView.DeleteButton"
                onPress={() => setIsDeleteDiagnosisDialogVisible(true)}
                appearance="outline"
              >
                Delete
              </Button>
            </>
          )}
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

DetailsView.propTypes = {
  eva: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withStyles(DetailsView, () => ({
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  scrollView: {
    height: '100%',
  },
  profileData: {
    marginBottom: 20,
  },
  dataRowTag: {
    marginBottom: 20,
  },
  dataRowTagStyle: {
    marginBottom: 10,
  },
  dataRow: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  saveButton: {
    marginBottom: 20,
  },
  discardButton: {
    marginBottom: 20,
  },
  deleteButton: {
    marginBottom: 40,
  },
}));
