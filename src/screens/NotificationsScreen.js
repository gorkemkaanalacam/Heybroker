import { Text } from 'react-native-rapi-ui';
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';
import { AuthContext } from '../context/ContextProvider';
import { Video } from 'expo-av';

export default NotificationsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const video = useRef(null);
  const [questionAnswersList, setQuestionAnswersList] = useState();
  const { state } = useContext(AuthContext);

  const onRefresh = useCallback(() => {
    fetchQuestionList();
  }, []);

  const fetchQuestionList = () => {
    setRefreshing(true);
    fetch('https://api.heybrokers.com/Question/List', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + state.userToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRefreshing(false);
        const questionAnswers = response.data.filter((x) => x.answer != null);
        setQuestionAnswersList(questionAnswers);
      });
  };

  useEffect(() => {
    fetchQuestionList();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 10 }}
        data={questionAnswersList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NotificationDetail', {
                  notification: item,
                })
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
                  {item.answer.title}
                </Text>
                <Text size="md" style={{ marginTop: 10 }} numberOfLines={3}>
                  {item.answer.answerText}
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
                  <Text size="sm">{item.answer.createdDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
