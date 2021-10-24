import { Button } from 'react-native-rapi-ui';
import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Image } from 'react-native';
import { AuthContext } from '../context/ContextProvider';
import { SliderBox } from 'react-native-image-slider-box';
import LoadingModal from '../components/LoadingModal';
import * as Linking from 'expo-linking';

export default HomeScreen = ({ navigation }) => {
  const [sliderList, setSliderList] = useState([]);
  const [sliderImageList, setSliderImageList] = useState([]);
  const { state } = useContext(AuthContext);

  const fetchSliderList = () => {
    fetch('https://api.heybrokers.com/Slider/List', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setSliderList(response.data);
        setSliderImageList(response.data.map((x) => x.url));
      });
  };

  useEffect(() => {
    fetchSliderList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {sliderImageList && (
        <SliderBox
          autoplay
          circleLoop
          images={sliderImageList}
          onCurrentImagePressed={(index) =>
            Linking.openURL(sliderList[index].link)
          }
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <Button
          text="Analizler"
          status="primary"
          style={{ flex: 1 }}
          onPress={() => navigation.jumpTo('AnalyzesNav')}
        />
        <View style={{ marginHorizontal: 5 }}></View>
        <Button
          text="Takvim"
          status="success"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('Calendar')}
        />
        <View style={{ marginHorizontal: 5 }}></View>
        <Button
          text="Haberler"
          status="info"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('News')}
        />
      </View>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: 'https://neodentalizmir.com/test/twitter.html',
        }}
        renderLoading={() => <LoadingModal loading={true} />}
        startInLoadingState={true}
      />
      {/* <Button text="Sign out" onPress={signOut} /> */}
    </View>
  );
};
