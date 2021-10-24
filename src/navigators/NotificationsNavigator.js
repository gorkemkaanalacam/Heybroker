import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionsScreen from '../screens/QuestionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationDetailScreen from '../screens/NotificationDetailScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const NotificationsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                textAlign: 'center',
                fontWeight: '700',
                color: '#FFF'
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
                  color: '#FFF'
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

export default NotificationsNavigator;
