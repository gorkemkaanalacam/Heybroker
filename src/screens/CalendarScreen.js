import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

export default CalendarScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: 'https://neodentalizmir.com/test/Test.html',
        }}
      />
    </View>
  );
};
