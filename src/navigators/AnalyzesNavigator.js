import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnalyzesScreen from '../screens/AnalyzesScreen';
import AnalysisDetailScreen from '../screens/AnalysisDetailScreen';
import { TouchableOpacity, Text, View } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';

const Stack = createNativeStackNavigator();

const AnalyzesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Analyzes"
        component={AnalyzesScreen}
        options={({ navigation }) => ({
          header: () => (
            <NavigationHeader title="Analizler" />
          ),
        })}
      />
      <Stack.Screen
        name="AnalysisDetail"
        component={AnalysisDetailScreen}
        options={({ navigation, route }) => {
          const item = route.params.analysis;
          return {
            headerTitle: () => (
              <NavigationHeader title={item.title} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AnalyzesNavigator;
