import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import NotificationService from './src/services/NotificationService';
import Navigation from './src/navigation/Navigation';

export default function App() {
  useEffect(() => {
    NotificationService.initialize();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Navigation />
    </NavigationContainer>
  );
}