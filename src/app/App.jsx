import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { getUserState } from '../store/actions/sessionActions';
import { AppNavigator, AuthNavigator } from '../routes';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getUserState());
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
