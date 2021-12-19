import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import { TouchableOpacity, Text } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ navigation }) => ({
          header: () => (
            <NavigationHeader title="Ekonomik Takvim" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
