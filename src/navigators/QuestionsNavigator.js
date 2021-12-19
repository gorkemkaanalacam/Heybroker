import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionsScreen from '../screens/QuestionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const QuestionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Questions"
        component={QuestionsScreen}
        options={({ navigation }) => ({
          header: () => (
            <NavigationHeader title="Sorular" />
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
            <NavigationHeader title="Bildirimler" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default QuestionsNavigator;
