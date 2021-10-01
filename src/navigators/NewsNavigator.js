import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsScreen from '../screens/NewsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const NewsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}
            >
              Haberler
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={({ navigation, route }) => {
          const news = route.params.news;
          return {
            headerTitle: () => (
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {news.author.name}
              </Text>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigator;
