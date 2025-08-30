import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import WebViewScreen from '../screens/WebViewScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WebView') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'VideoPlayer') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="WebView" 
        component={WebViewScreen}
        options={{
          title: 'WebView & Notifications',
          tabBarLabel: 'WebView',
        }}
      />
      <Tab.Screen 
        name="VideoPlayer" 
        component={VideoPlayerScreen}
        options={{
          title: 'HLS Video Player',
          tabBarLabel: 'Video',
        }}
      />
    </Tab.Navigator>
  );
}