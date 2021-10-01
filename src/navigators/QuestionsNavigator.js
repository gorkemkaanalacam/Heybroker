import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionsScreen from '../screens/QuestionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const QuestionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Questions"
        component={QuestionsScreen}
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
              Sorular
            </Text>
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       navigation.navigate('Notifications');
          //     }}
          //   >
          //     <Ionicons name="notifications" size={24} color="gray" />
          //   </TouchableOpacity>
          // ),
        })}
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
              }}
            >
              Bildirimler
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default QuestionsNavigator;
