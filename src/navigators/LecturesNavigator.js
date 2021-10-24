import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LecturesScreen from '../screens/LecturesScreen';
import LectureDetailScreen from '../screens/LectureDetailScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const LecturesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectures"
        component={LecturesScreen}
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
              Dersler
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="LectureDetail"
        component={LectureDetailScreen}
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
              Ders 1
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default LecturesNavigator;
