import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnalyzesScreen from '../screens/AnalyzesScreen';
import AnalysisDetailScreen from '../screens/AnalysisDetailScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AnalyzesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Analyzes"
        component={AnalyzesScreen}
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
              Analizler
            </Text>
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
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {item.title}
              </Text>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AnalyzesNavigator;
