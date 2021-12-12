import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewsScreen from '../screens/NewsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationDetailScreen from '../screens/NotificationDetailScreen';
import { TouchableOpacity, Text, View } from 'react-native';
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
                color: '#79A7CC'
              }}
            >
              Hey Brokers!
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={24} color="#79A7CC" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="mail" size={24} color="#79A7CC" />
              </TouchableOpacity>
            </View>
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
                color: '#79A7CC'
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
                color: '#79A7CC'
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
                color: '#79A7CC'
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
                  color: '#79A7CC'
                }}
              >
                {news.author.name}
              </Text>
            ),
          };
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: '700',
                color: '#79A7CC'
              }}
            >
              Bildirimler
            </Text>
          ),
        })}
      />

      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={({ navigation, route }) => {
          const item = route.params.notification;
          return {
            headerTitle: () => (
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#79A7CC'
                }}
              >
                {item.answer.title}
              </Text>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
