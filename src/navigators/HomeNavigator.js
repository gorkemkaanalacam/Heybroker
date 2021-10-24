import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsScreen from '../screens/NewsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF'
              }}
            >
              Keşfet
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person" size={24} color="gray" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF'
              }}
            >
              Profile
            </Text>
          ),
        })}
      />

      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF'
              }}
            >
              Ekonomik Takvim
            </Text>
          ),
        })}
      />

      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFF'
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
                  color: '#FFF'
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

export default HomeNavigator;
