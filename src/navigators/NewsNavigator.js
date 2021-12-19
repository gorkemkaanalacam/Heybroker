import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsScreen from '../screens/NewsScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { TouchableOpacity, Text } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const NewsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ navigation }) => ({
          header: () => (
            <NavigationHeader title="Haberler" />
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
              <NavigationHeader title={news.author.name} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigator;
