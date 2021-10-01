import { Text } from 'react-native-rapi-ui';
import React, { useRef, useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View, Platform } from 'react-native';
import { Video } from 'expo-av';

export default LectureDetailScreen = ({ route }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const item = route.params.lecture;

  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (Platform.OS === 'android') {
      switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
          await ScreenOrientation.unlockAsync();
          break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
          );
          break;
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text size="xl" style={{ alignSelf: 'center', fontWeight: '700' }}>
        {item.title}
      </Text>
      <Video
        style={{
          alignSelf: 'center',
          width: 320,
          height: 200,
        }}
        ref={video}
        source={{
          uri: item.url,
        }}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onFullscreenUpdate={onFullscreenUpdate}
      />
      <Text size="md" style={{ marginTop: 20 }}>
        {item.description}
      </Text>
    </View>
  );
};
