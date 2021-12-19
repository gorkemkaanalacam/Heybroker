import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LecturesNavigator from './LecturesNavigator';
import CalendarNavigator from '../navigators/CalendarNavigator';
import NewsNavigator from '../navigators/NewsNavigator';
import HomeNavigator from '../navigators/HomeNavigator';
import QuestionsNavigator from '../navigators/QuestionsNavigator';
import AnalyzesNavigator from '../navigators/AnalyzesNavigator';
import NotificationsNavigator from '../navigators/NotificationsNavigator';
import { TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/ContextProvider';
import * as SecureStore from 'expo-secure-store';
import { colors } from '../constants';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const { state } = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeNav') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'LecturesNav') {
            return (
              <Ionicons
                name={focused ? 'videocam' : 'videocam-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'AnalyzesNav') {
            return (
              <Ionicons
                name={focused ? 'bar-chart' : 'bar-chart-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'CalendarNav') {
            return (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'NewsNav') {
            return (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'QuestionsNav') {
            return (
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'NotificationsNav') {
            return (
              <Ionicons
                name={focused ? 'mail' : 'mail-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: colors.neonblue,
      })}
    >
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          title: 'Keşfet',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AnalyzesNav"
        component={AnalyzesNavigator}
        options={{
          title: 'Analizler',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LecturesNav"
        component={LecturesNavigator}
        options={{
          title: 'Dersler',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CalendarNav"
        component={CalendarNavigator}
        options={{
          title: 'Takvim',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewsNav"
        component={NewsNavigator}
        options={{
          title: 'Haberler',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QuestionsNav"
        component={QuestionsNavigator}
        options={{
          title: 'Sor Gelsin',
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="NotificationsNav"
        component={NotificationsNavigator}
        options={{
          title: 'Gelen Kutusu',
          headerShown: false,
          tabBarBadge: state.notificationCount,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default AppNavigator;
