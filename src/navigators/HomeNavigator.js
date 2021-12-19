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
import NavigationHeader from '../components/NavigationHeader';
import { colors } from '../constants';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: () => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              backgroundColor: '#121212'
            }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.neonblue
                }}
              >
                Hey Brokers!
              </Text>
              <View style={{ flexDirection: 'row', position: 'absolute', right: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Ionicons name="person" size={24} color={colors.neonblue} style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                  <Ionicons name="mail" size={24} color={colors.neonblue} />
                </TouchableOpacity>
              </View>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <NavigationHeader title="Profile" />
          ),
        })}
      />

      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <NavigationHeader title="Ekonomik Takvim" />
          ),
        })}
      />

      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
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

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <NavigationHeader title="Bildirimler" />
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
              <NavigationHeader title={item.answer.title} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
