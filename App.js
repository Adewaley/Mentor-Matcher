import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); // Ignore log notification by message

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher order component */}
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>    
    </NavigationContainer>
    
  );
}

