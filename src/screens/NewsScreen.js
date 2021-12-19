import { Text } from 'react-native-rapi-ui';
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

export default NewsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [newsList, setNewsList] = useState();

  const onRefresh = useCallback(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = () => {
    setRefreshing(true);
    fetch(
      'https://feed2json.org/convert?url=https://tr.investing.com/rss/news_301.rss'
    )
      .then((response) => response.json())
      .then((response) => {
        setRefreshing(false);
        setNewsList(response.items);
      });
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10 }}
        data={newsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('NewsDetail', { news: item })}
            >
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  height: 140,
                  backgroundColor: '#262834',
                }}
              >
                <Text style={{ fontSize: 17 }}>{item.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                  }}
                >
                  <Text style={{ fontSize: 12 }}>{item.date_published}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
