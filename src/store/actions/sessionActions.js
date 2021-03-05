/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CURTIS_SERVER } from '@env';

import { firebase } from '../../utils/database';
import {
  LOAD_USER,
  UPDATE_USER,
  RESTORE_USER,
  SET_LOADING_STATUS,
} from './sessionActions.types';

export const setLoadingStatus = (isLoading) => async (dispatch) => {
  dispatch({ type: SET_LOADING_STATUS, payload: { isLoading } });
};

export const signIn = (email, password, callback) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    Alert.alert('Success', "You're now signed in");

    if (callback) {
      callback();
    }
  } catch (e) {
    Alert.alert('Error', e.message);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const signUp = (
  name,
  email,
  password,
  sex,
  birthDate,
  weight,
  height,
  callback
) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { uid } = response.user;
    const user = {
      uid,
      name,
      email,
      password,
      sex,
      birthDate,
      weight,
      height,
      history: [],
    };

    await firebase.firestore().collection('users').doc(uid).set(user);

    Alert.alert('Success', "You're now signed up");

    if (callback) {
      callback();
    }
  } catch (e) {
    Alert.alert(e);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const signOut = (callback) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    Alert.alert('Confirm', 'Are you sure you want to sign out?', [
      {
        text: 'No, stay',
        onPress: () => {
          dispatch(setLoadingStatus(false));
        },
      },
      {
        text: 'Yes, sign me out',
        style: 'destructive',
        onPress: async () => {
          await firebase.auth().signOut();
          await AsyncStorage.removeItem('user');

          callback();
        },
      },
    ]);
  } catch (e) {
    Alert.alert('Something went wrong', 'Please try again later');
  }
};

export const cacheUser = (user) => async () => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(cacheUser(user));
  dispatch({ type: UPDATE_USER, payload: { user } });
};

export const loadUser = (user) => async (dispatch) => {
  dispatch({ type: LOAD_USER, payload: { user } });
};

export const restoreUser = () => async (dispatch) => {
  const cachedUser = await AsyncStorage.getItem('user');

  if (cachedUser) {
    dispatch({
      type: RESTORE_USER,
      payload: { user: JSON.parse(cachedUser) },
    });

    Alert.alert('Application offline', 'Please check your internet connection');
  } else {
    dispatch({ type: RESTORE_USER, payload: { user: null } });

    Alert.alert('Something went wrong', 'Please sign in again');
  }
};

export const editUser = (
  name,
  sex,
  birthDate,
  weight,
  height,
  email,
  callback
) => async (dispatch, getState) => {
  dispatch(setLoadingStatus(true));

  try {
    const { user } = await getState().session;

    if (email !== user.email) {
      await firebase.auth().currentUser.updateEmail(email);
    }

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({ name, sex, birthDate, weight, height, email });

    Alert.alert('Success', 'Your profile was edited');

    if (callback) {
      callback();
    }
  } catch (e) {
    Alert.alert('Error', e.message);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const getUserState = () => async (dispatch) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    setLoadingStatus(true);

    try {
      if (user) {
        const usersRef = firebase.firestore().collection('users');
        const userDocument = await usersRef.doc(user.uid).get();
        const userData = userDocument.data();

        dispatch(cacheUser(userData));
        dispatch(loadUser(userData));

        usersRef.doc(user.uid).onSnapshot((userSnapshot) => {
          const userSnapshotData = userSnapshot.data();

          dispatch(updateUser(userSnapshotData));
        });
      } else {
        dispatch(loadUser(null));
      }
    } catch (e) {
      dispatch(restoreUser());
    } finally {
      dispatch(setLoadingStatus(false));
    }
  });
};

export const runDiagnosis = (metrics, callback) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const {
      data: diagnosis,
    } = await axios.post(`${CURTIS_SERVER}/api/diagnose`, { ...metrics });

    callback(diagnosis);
  } catch (e) {
    if (e.response?.data?.detail) {
      Alert.alert(e.response.data.detail);
    } else {
      Alert.alert('Something went wrong, check your connection and try again');
    }
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const saveDiagnosis = (diagnosis, callback) => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingStatus(true));

  try {
    const { user } = getState().session;

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        history: firebase.firestore.FieldValue.arrayUnion(diagnosis),
      });

    Alert.alert('Success', 'Your diagnosis is now saved');

    callback();
  } catch (e) {
    Alert.alert(e);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const deleteDiagnosis = (diagnosis, callback) => async (
  dispatch,
  getState
) => {
  dispatch(setLoadingStatus(true));

  try {
    const { user } = getState().session;

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        history: firebase.firestore.FieldValue.arrayRemove(diagnosis),
      });

    Alert.alert('Success', 'Your diagnosis was successfully deleted');

    callback();
  } catch (e) {
    Alert.alert(e);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};

export const checkForEmail = (email, callback) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

    if (snapshot.empty) {
      Alert.alert('E-mail already taken', 'Please sign in instead');

      return;
    }

    callback();
  } catch (e) {
    Alert.alert(e);
  } finally {
    dispatch(setLoadingStatus(false));
  }
};
