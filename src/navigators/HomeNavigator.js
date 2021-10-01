import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
              }}
            >
              Profile
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
