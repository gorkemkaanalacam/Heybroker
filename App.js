import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-rapi-ui';
import * as React from 'react';
import { Dimensions } from 'react-native';
import RootNavigator from './src/navigators/RootNavigator';
import ContextProvider from './src/context/ContextProvider';

const windowWidth = Dimensions.get('window').width;

export default App = () => {
  return (
    <ContextProvider>
      <StatusBar hidden />
      <ThemeProvider theme="dark">
        <RootNavigator />
      </ThemeProvider>
    </ContextProvider>
  );
};
