import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeView, HistoryView, ProfileView } from '../views';

const TabBarIcon = ({ name, color, focused }) => {
  const tabBarIconBackgroundStyle = {
    width: 44,
    height: 44,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: focused ? color : 'transparent',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: focused ? `${color}17` : 'transparent',
  };
  const tabBarIconStyle = {
    width: 22,
    height: 22,
  };

  return (
    <View style={tabBarIconBackgroundStyle}>
      <Icon name={name} fill={color} style={tabBarIconStyle} />
    </View>
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

const HomeNavigator = ({ eva }) => {
  const { Navigator, Screen } = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      height: Platform.OS === 'ios' ? 100 : 75,
      paddingTop: Platform.OS === 'ios' ? 15 : 0,
      borderTopWidth: 1,
      borderTopColor: eva.theme['color-basic-600'],
    },
    activeTintColor: eva.theme['color-primary-500'],
    inactiveTintColor: eva.theme['color-basic-600'],
  };
  const tabBarSceneContainerStyle = {
    backgroundColor: eva.theme['color-basic-100'],
  };

  return (
    <Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ size, color, focused }) => {
          let name;

          if (route.name === 'Home') {
            name = 'heart-outline';
          } else if (route.name === 'History') {
            name = 'book-open-outline';
          } else if (route.name === 'Profile') {
            name = 'person-outline';
          }

          return (
            <TabBarIcon
              name={name}
              size={size}
              color={color}
              focused={focused}
            />
          );
        },
      })}
      tabBarOptions={tabBarOptions}
      initialRouteName="Home"
      sceneContainerStyle={tabBarSceneContainerStyle}
    >
      <Screen name="Home" component={HomeView} />
      <Screen name="History" component={HistoryView} />
      <Screen name="Profile" component={ProfileView} />
    </Navigator>
  );
};

HomeNavigator.propTypes = {
  eva: PropTypes.object.isRequired,
};

export default withStyles(HomeNavigator);
