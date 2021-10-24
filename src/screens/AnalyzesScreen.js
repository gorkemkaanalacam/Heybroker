import { Text, Layout, themeColor } from 'react-native-rapi-ui';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { AuthContext } from '../context/ContextProvider';

export default AnalyzesScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [analysisList, setAnalysisList] = useState();
  const { state } = useContext(AuthContext);

  const onRefresh = useCallback(() => {
    fetchAnalysisList();
  }, []);

  const fetchAnalysisList = () => {
    setRefreshing(true);
    fetch('https://api.heybrokers.com/Analysis/List', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRefreshing(false);
        setAnalysisList(response.data);
      });
  };

  useEffect(() => {
    fetchAnalysisList();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10 }}
        data={analysisList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AnalysisDetail', { analysis: item })
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
                  {'> Devamı <'}
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
    </Layout>
  );
};
