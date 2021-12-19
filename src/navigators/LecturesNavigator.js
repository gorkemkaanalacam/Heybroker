import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LecturesScreen from '../screens/LecturesScreen';
import LectureDetailScreen from '../screens/LectureDetailScreen';
import { TouchableOpacity, Text } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const LecturesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lectures"
        component={LecturesScreen}
        options={({ navigation }) => ({
          header: () => (
            <NavigationHeader title="Dersler" />
          ),
        })}
      />
      <Stack.Screen
        name="LectureDetail"
        component={LectureDetailScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <NavigationHeader title="Ders" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default LecturesNavigator;
