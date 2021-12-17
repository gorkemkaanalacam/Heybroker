import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../constants';

const Stack = createNativeStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                color: colors.neonblue
              }}
            >
              Ekonomik Takvim
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
