import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/ContextProvider';
import AppNavigator from '../navigators/AppNavigator';
import AuthNavigator from '../navigators/AuthNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoadingModal from '../components/LoadingModal';

const RootNavigator = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {state.isLoading ? (
        // We haven't finished checking for the token yet
        <LoadingModal loading={state.isLoading} />
      ) : state.userToken == null ? (
        // No token found, user isn't signed in
        <AuthNavigator />
      ) : (
        // User is signed in
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
