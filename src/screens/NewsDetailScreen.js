import { Text } from 'react-native-rapi-ui';
import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default NewsDetailScreen = ({ route }) => {
  const news = route.params.news;

  return (
    <>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: news.url }}
        startInLoadingState={true}
      />
    </>
  );
};
