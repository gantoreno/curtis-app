import React from 'react';
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

const DetailsView = ({ eva, navigation, route }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  const { result, fromDiagnosis = false } = route.params;

  return (
    <SafeAreaView>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
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
                unit="mmHg"
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
                    saveDiagnosis(result, () => {
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
                onPress={() =>
                  Alert.alert(
                    'Confirm',
                    'Are you sure you want to discard this results?',
                    [
                      {
                        text: 'No, take me back to the results',
                      },
                      {
                        text: 'Yes, discard this results',
                        style: 'destructive',
                        onPress: () => navigation.navigate('Home'),
                      },
                    ]
                  )
                }
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
                onPress={() =>
                  Alert.alert(
                    'Confirm',
                    'Are you sure you want to delete this results?',
                    [
                      {
                        text: 'No, take me back to the results',
                      },
                      {
                        text: 'Yes, delete this results',
                        style: 'destructive',
                        onPress: () => {
                          dispatch(
                            deleteDiagnosis(result, () => {
                              navigation.navigate('Home');
                            })
                          );
                        },
                      },
                    ]
                  )
                }
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
