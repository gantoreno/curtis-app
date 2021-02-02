import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Text, withStyles } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import { signOut } from '../store/actions/sessionActions';
import { Button, Wrapper, DataEntry } from '../shared';
import { parseSexFromIndex, parseAgeFromDateString } from '../utils/tools';

const ProfileView = ({ eva }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.session);

  return (
    <SafeAreaView>
      <StatusBar
        translucent={false}
        backgroundColor={eva.theme['color-basic-100']}
      />
      <ScrollView style={eva.style.scrollView}>
        <Wrapper style={eva.style.wrapper}>
          <Text style={eva.style.title} category="h1">
            Your{'\n'}
            <Text status="primary" category="h1">
              profile
            </Text>
          </Text>
          <View style={eva.style.profilePicture}>
            <Ionicons
              name="ios-person-outline"
              style={eva.style.profilePictureIcon}
            />
          </View>
          <View style={eva.style.profileData}>
            <View style={eva.style.dataRow}>
              <DataEntry
                label="Name"
                value={user.name}
                testID="ProfileView.DataEntry-name"
                halfWidth
              />
              <DataEntry
                unit="years"
                label="Age"
                value={parseAgeFromDateString(user.birthDate)}
                testID="ProfileView.DataEntry-age"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                unit="kg"
                label="Weight"
                value={user.weight}
                testID="ProfileView.DataEntry-weight"
                halfWidth
              />
              <DataEntry
                unit="cm"
                label="Height"
                value={user.height}
                testID="ProfileView.DataEntry-height"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                label="Sex"
                value={parseSexFromIndex(user.sex)}
                testID="ProfileView.DataEntry-sex"
                halfWidth
              />
              <DataEntry
                label="Birth date"
                value={user.birthDate}
                testID="ProfileView.DataEntry-birthDate"
                halfWidth
              />
            </View>
            <View style={eva.style.dataRow}>
              <DataEntry
                label="E-mail"
                value={user.email}
                testID="ProfileView.DataEntry-email"
              />
            </View>
          </View>
          <Button
            testID="ProfileView.SignOutButton"
            onPress={() =>
              dispatch(
                signOut(() => {
                  Alert.alert('Successfully signed out!');
                })
              )
            }
            disabled={isLoading}
            appearance="outline"
          >
            Sign out
          </Button>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

ProfileView.propTypes = {
  eva: PropTypes.object.isRequired,
};

export default withStyles(ProfileView, (theme) => ({
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
  profilePicture: {
    marginBottom: 40,
    width: 154,
    height: 154,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme['color-basic-600'],
    borderRadius: 77,
    justifyContent: 'center',
    backgroundColor: theme['color-basic-200'],
  },
  profilePictureIcon: {
    color: theme['color-basic-600'],
    fontSize: 66,
  },
  profileData: {
    marginBottom: 20,
  },
  dataRow: {
    marginBottom: 20,
    flexDirection: 'row',
  },
}));
