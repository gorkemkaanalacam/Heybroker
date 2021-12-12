import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-rapi-ui';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import RootNavigator from './src/navigators/RootNavigator';
import ContextProvider from './src/context/ContextProvider';
import OneSignal from 'react-native-onesignal';
import { InitLocalization } from './src/helpers/Localization';

const windowWidth = Dimensions.get('window').width;

export default App = () => {
  useEffect(() => {
    OneSignal.setAppId("71e6dc71-05bc-4b81-a258-dda4f7afe751");
    InitLocalization();
  }, []);

  return (
    <ContextProvider>
      <StatusBar hidden />
      <ThemeProvider theme="dark">
        <RootNavigator />
      </ThemeProvider>
    </ContextProvider>
  );
};
