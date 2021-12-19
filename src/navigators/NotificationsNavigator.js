import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionsScreen from '../screens/QuestionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationDetailScreen from '../screens/NotificationDetailScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const NotificationsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          header: () => (
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

export default NotificationsNavigator;
