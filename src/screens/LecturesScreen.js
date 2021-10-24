import { Text } from 'react-native-rapi-ui';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { AuthContext } from '../context/ContextProvider';

export default LecturesScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [lectureList, setLectureList] = useState();
  const { state } = useContext(AuthContext);

  const onRefresh = useCallback(() => {
    fetchLectureList();
  }, []);

  const fetchLectureList = () => {
    setRefreshing(true);
    fetch('https://api.heybrokers.com/Lecture/List', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRefreshing(false);
        setLectureList(response.data);
      });
  };

  useEffect(() => {
    fetchLectureList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10 }}
        data={lectureList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LectureDetail', { lecture: item })
              }
            >
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  height: 160,
                  backgroundColor: '#262834',
                }}
              >
                <Text
                  size="xl"
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </Text>
                <Text size="md" style={{ marginTop: 10 }} numberOfLines={3}>
                  {item.description}
                </Text>
                <Text size="md" style={{ marginTop: 10, textAlign: 'center' }}>
                  {'> İzle <'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                  }}
                >
                  <Text size="sm">{item.createdDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
